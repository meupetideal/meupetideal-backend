import { Either, Left, Right, left, right } from './either';

function doSomething(shouldSuccess: boolean): Either<string, number> {
  if (shouldSuccess) {
    return right(1);
  }
  return left('error');
}

test('success result', () => {
  const result = doSomething(true);

  expect(result.isRight()).toBeTruthy();
  expect(result.isLeft()).toBeFalsy();
  expect(result.value).toBe(1);
});

test('error result', () => {
  const result = doSomething(false);

  expect(result.isRight()).toBeFalsy();
  expect(result.isLeft()).toBeTruthy();
  expect(result.value).toBe('error');
});

describe('Left Unit Tests', () => {
  it('should create an instance of Left with a value and assign it correctly to the value property', () => {
    const value = 'test value';

    const leftInstance = new Left(value);

    expect(leftInstance.value).toBe(value);
  });

  it('should return true when calling isLeft on an instance of Left', () => {
    const leftInstance = new Left('test value');

    expect(leftInstance.isLeft()).toBe(true);
    expect(leftInstance.isRight()).toBe(false);
  });
});

describe('Right Unit Tests', () => {
  it('should create an instance of Right with a value and assign it correctly to the value property', () => {
    const value = 'test value';

    const rightInstance = new Right(value);

    expect(rightInstance.value).toBe(value);
  });

  it('should return true when calling isRight on an instance of Right', () => {
    const rightInstance = new Right('test value');

    expect(rightInstance.isRight()).toBe(true);
    expect(rightInstance.isLeft()).toBe(false);
  });
});
