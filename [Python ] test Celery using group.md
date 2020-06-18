```python
import celery
from celery import Celery, group, states
from celery.backends.redis import RedisBackend


def patch_celery():
    """Patch redis backend."""

    def _unpack_chord_result(self, tup, decode,
                             EXCEPTION_STATES=states.EXCEPTION_STATES,
                             PROPAGATE_STATES=states.PROPAGATE_STATES):
        _, tid, state, retval = decode(tup)
        if state in EXCEPTION_STATES:
            retval = self.exception_to_python(retval)
        if state in PROPAGATE_STATES:
            # raise ChordError('Dependency {0} raised {1!r}'.format(tid, retval))
            return '{}: {}'.format(retval.__class__.__name__, str(retval))
        return retval

    celery.backends.redis.RedisBackend._unpack_chord_result = _unpack_chord_result

    return celery


redis_url = "redis://localhost:6379"
app = patch_celery().Celery('test_celery', backend=redis_url, broker=redis_url)


@app.task()
def good_task():
    return 'Good task'


@app.task()
def other_good_task():
    return 'Other good task'


@app.task()
def bad_task():
    raise Exception('Bad Task!!!')


@app.task()
def task_completed(results):
    print('Tasks completed', results)


if __name__ == '__main__':
    # A chained group of tasks is automatically Upgraded to a Chord
    (group(good_task.s(), bad_task.s(), other_good_task.s()) | task_completed.s()).delay()

```
