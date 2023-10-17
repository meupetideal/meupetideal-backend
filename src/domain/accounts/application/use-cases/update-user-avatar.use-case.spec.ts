import { InMemoryUsersRepository } from 'test/repositories/in-memory-users.repository';
import { FakeStorageGateway } from 'test/gateways/fake-storage';
import { UserBuilder } from 'test/data-builders/user.builder';
import { UpdateUserAvatarUseCase } from './update-user-avatar.use-case';
import { UserNotFoundError } from './errors/user-not-found.error';
import { InvalidAvatarTypeError } from './errors/invalid-avatar-type.error';
import { InvalidAvatarSizeError } from './errors/invalid-avatar-size.error';

describe('#UC06 UpdateUserAvatarUseCase', () => {
  let usersRepository: InMemoryUsersRepository;
  let storageGateway: FakeStorageGateway;

  let sut: UpdateUserAvatarUseCase;

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    storageGateway = new FakeStorageGateway();

    sut = new UpdateUserAvatarUseCase(storageGateway, usersRepository);
  });

  it('should be able to update an user avatar', async () => {
    const existingUser = UserBuilder.create().build();
    await usersRepository.insert(existingUser);

    const spyFindById = vi.spyOn(usersRepository, 'findById');
    const spyUpdate = vi.spyOn(usersRepository, 'save');
    const spyUpload = vi.spyOn(storageGateway, 'upload');

    const input = {
      userId: existingUser.id.value,
      fileName: 'avatar.png',
      fileType: 'image/png',
      body: Buffer.from('avatar'),
    };

    const output = await sut.execute(input);
    expect(output.avatarUrl).toContain('-avatar.png');
    expect(storageGateway.uploads.length).toBe(1);

    expect(spyFindById).toHaveBeenCalledWith(input.userId);
    expect(spyUpdate).toHaveBeenCalledWith(existingUser);
    expect(spyUpload).toHaveBeenCalledWith({
      fileName: input.fileName,
      fileType: input.fileType,
      body: input.body,
    });
  });

  it('should not be able to update an user avatar if user does not exist', async () => {
    const input = {
      userId: 'non-existing-user-id',
      fileName: 'avatar.png',
      fileType: 'image/png',
      body: Buffer.from('avatar'),
    };

    expect(sut.execute(input)).rejects.toThrowError(UserNotFoundError);
  });

  it('should not be able to update an user avatar if file type is invalid', async () => {
    const userId = 'user-id';
    const existingUser = UserBuilder.create().withId(userId).build();
    await usersRepository.insert(existingUser);

    const arrange = [
      {
        fileName: 'avatar.pdf',
        fileType: 'application/pdf',
        body: Buffer.from('avatar'),
      },
      {
        fileName: 'avatar.json',
        fileType: 'application/json',
        body: Buffer.from('avatar'),
      },
      {
        fileName: 'avatar.txt',
        fileType: 'text/plain',
        body: Buffer.from('avatar'),
      },
      {
        fileName: 'avatar.exe',
        fileType: 'application/octet-stream',
        body: Buffer.from('avatar'),
      },
      {
        fileName: 'avatar.gif',
        fileType: 'image/gif',
        body: Buffer.from('avatar'),
      },
    ];

    arrange.forEach((input) => {
      expect(sut.execute({ userId, ...input })).rejects.toThrowError(
        InvalidAvatarTypeError,
      );
    });
  });

  it('should not be able to update an user avatar if file is bigger than 1MB', async () => {
    const userId = 'user-id';
    const existingUser = UserBuilder.create().withId(userId).build();
    await usersRepository.insert(existingUser);

    const input = {
      fileName: 'avatar.png',
      fileType: 'image/png',
      body: Buffer.alloc(1 * 1024 * 1024 + 1),
    };

    expect(sut.execute({ userId, ...input })).rejects.toThrowError(
      InvalidAvatarSizeError,
    );
  });

  it('should delete old avatar if user already has one', async () => {
    const spyDelete = vi.spyOn(storageGateway, 'delete');

    const existingUser = UserBuilder.create()
      .withAvatarUrl('123-old-avatar.png')
      .build();
    await usersRepository.insert(existingUser);
    storageGateway.uploads.push({
      fileName: 'old-avatar.png',
      url: '123-old-avatar.png',
    });

    const input = {
      userId: existingUser.id.value,
      fileName: 'new-avatar.png',
      fileType: 'image/png',
      body: Buffer.from('new-avatar'),
    };

    await sut.execute(input);

    expect(spyDelete).toHaveBeenCalledWith('123-old-avatar.png');
    expect(storageGateway.uploads.length).toBe(1);
    expect(storageGateway.uploads).toContainEqual({
      fileName: 'new-avatar.png',
      url: expect.stringContaining('-new-avatar.png'),
    });
  });
});
