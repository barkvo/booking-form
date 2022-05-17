import { pipe } from 'fp-ts/pipeable';
import * as TE from 'fp-ts/TaskEither';
import { eitherToPromise } from './either-to-promise';

describe('eitherToPromise', () => {
  it('testing eitherToPromise function', async () => {
    class TestError extends Error {
    }

    const testFailFunction = (): TE.TaskEither<TestError, boolean> => {
      return TE.left(new TestError('An error has happened'));
    };

    const testFailFunction2 = (): TE.TaskEither<TestError, boolean> => {
      return TE.left(new TestError('An error has happened in second function'));
    };

    const testSuccessFunction = (): TE.TaskEither<TestError, boolean> => {
      return TE.right(true);
    };

    try {
      await eitherToPromise(testFailFunction());
    } catch (e) {
      expect(e.message).toMatch('An error has happened');
    }

    const response = await eitherToPromise(testSuccessFunction());
    expect(response).toBe(true);

    try {
      await eitherToPromise(pipe(
        testSuccessFunction(),
        TE.chain(testFailFunction),
      ));
    } catch (e) {
      expect(e.message).toMatch('An error has happened');
    }

    try {
      await eitherToPromise(pipe(
        testFailFunction(),
        TE.chain(testSuccessFunction),
      ));
    } catch (e) {
      expect(e.message).toMatch('An error has happened');
    }

    try {
      await eitherToPromise(pipe(
        testFailFunction(),
        TE.fold(testFailFunction2, testSuccessFunction),
        TE.chain(testSuccessFunction),
      ));
    } catch (e) {
      expect(e.message).toMatch('An error has happened in second function');
    }

    try {
      await eitherToPromise(pipe(
        testFailFunction2(),
        TE.fold(testSuccessFunction, testSuccessFunction),
        TE.chain(testFailFunction),
      ));
    } catch (e) {
      expect(e.message).toMatch('An error has happened');
    }
  });
});
