import Vue from 'vue'
import { mount } from '@vue/test-utils'
import FileDrop from '@/components/FileDrop'

const tick = () => Vue.nextTick()

const lastCallArgs = fn => {
  return fn.mock.calls[fn.mock.calls.length - 1][0]
}

const createWrapper = (options = {}) => {
  const fn = jest.fn()
  const component = {
    ...options,
    render(h) {
      return h(FileDrop, {
        ref: 'filedrop',
        scopedSlots: {
          default: props => {
            fn(props)
            return h()
          },
        },
      })
    },
  }

  return {
    fn,
    wrapper: mount(component),
  }
}

const createFile = (content = 'text') => {
  return new Blob([content], { type: 'text/pain' })
}

describe('The FileDrop component', () => {
  test('mounts with normal slot', async () => {
    const wrapper = mount(FileDrop, {
      slots: {
        default: `<p class="test">Test</p>`,
      },
    })
    await Vue.nextTick()
    const el = wrapper.find('.test')

    expect(el.text()).toBe('Test')
  })

  test('scoped slot passes slotProps', async () => {
    const { fn } = createWrapper()
    await Vue.nextTick()
    expect(fn).toHaveBeenCalledWith(expect.any(Object))
    const props = lastCallArgs(fn)

    expect(props.open).toEqual(expect.any(Function))
  })

  test('renders input', async () => {
    const { wrapper } = createWrapper()

    const input = wrapper.find('input')

    await Vue.nextTick()
    expect(input.element).toBeDefined()
    expect(input.element.type).toBe('file')
  })

  test('input can add a file', async () => {
    const { wrapper, fn } = createWrapper()

    const file = createFile()

    // hacky because we can't trigger a proper change event on the input
    wrapper.vm.$refs.filedrop.onFileInputChange({
      target: {
        files: [file],
      },
    })

    await tick()

    expect(lastCallArgs(fn).files).toEqual(expect.any(Array))
    expect(lastCallArgs(fn).files.length).toBe(1)
  })

  test('drop can add a file', async () => {
    const { wrapper, fn } = createWrapper()

    const file = createFile()

    // hacky because we can't trigger a proper change event on the input
    wrapper.vm.$refs.filedrop.onFileDrop({
      dataTransfer: {
        files: [file],
      },
    })

    await tick()

    expect(lastCallArgs(fn).files).toEqual(expect.any(Array))
    expect(lastCallArgs(fn).files.length).toBe(1)
  })

  test('remove does remove a file', async () => {
    const { wrapper, fn } = createWrapper()

    const file = createFile()

    // hacky because we can't trigger a proper change event on the input
    wrapper.vm.$refs.filedrop.onFileDrop({
      dataTransfer: {
        files: [file],
      },
    })

    await tick()

    const props = lastCallArgs(fn)

    expect(lastCallArgs(fn).files.length).toBe(1)
    props.remove(0)

    await tick()
    expect(lastCallArgs(fn).files.length).toBe(0)
  })
})
