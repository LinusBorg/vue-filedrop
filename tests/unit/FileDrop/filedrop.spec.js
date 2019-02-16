import Vue from 'vue'
import { mount } from '@vue/test-utils'
import FileDrop from '@/components/FileDrop'
import {
  createFile,
  createWrapper,
  mockConsole,
} from '../resources/filedrop.utils'
const tick = () => Vue.nextTick()

const lastCallArgs = fn => {
  return fn.mock.calls[fn.mock.calls.length - 1][0]
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
    wrapper.vm.onFileInputChange({
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
    wrapper.vm.onFileDrop({
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
    wrapper.vm.onFileDrop({
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

  test('clear does remove all files', async () => {
    const { wrapper, fn } = createWrapper({
      propsData: {
        multiple: true,
      },
    })

    const file = createFile()
    const file2 = createFile()
    // hacky because we can't trigger a proper change event on the input
    wrapper.vm.onFileDrop({
      dataTransfer: {
        files: [file, file2],
      },
    })

    await tick()

    const props = lastCallArgs(fn)

    expect(lastCallArgs(fn).files.length).toBe(2)
    props.clear()

    await tick()
    expect(lastCallArgs(fn).files.length).toBe(0)
  })

  test('emits event for added files', async () => {
    const { wrapper } = createWrapper()

    const file = createFile()
    const cb = jest.fn()
    // hacky because we can't trigger a proper change event on the input
    wrapper.vm.$on('change', cb)
    wrapper.vm.onFileDrop({
      dataTransfer: {
        files: [file],
      },
    })

    await tick()

    expect(cb).toHaveBeenCalledWith(expect.arrayContaining([file]))

    cb.mockClear()
    wrapper.vm.emit()
    expect(cb).toHaveBeenCalledWith(expect.arrayContaining([file]))
  })

  test('can switch root element', async () => {
    const { wrapper } = createWrapper({
      propsData: {
        tag: 'span',
      },
    })

    expect(wrapper.vm.$el.tagName).toBe('SPAN')
  })

  test('respects the max prop', async () => {
    const spys = mockConsole()
    const { wrapper, fn } = createWrapper({
      propsData: {
        multiple: true,
        max: 2,
      },
    })

    const input = wrapper.find('input')

    expect(input.element.max).toBe('2')

    const file = createFile()
    const file2 = createFile()
    wrapper.vm.onFileDrop({
      dataTransfer: {
        files: [file, file2],
      },
    })

    wrapper.vm.onFileDrop({
      dataTransfer: {
        files: [createFile()],
      },
    })

    await tick()

    const props = lastCallArgs(fn)
    expect(props.hasFiles).toBe(true)
    expect(props.files.length).toBe(2)

    spys.unwatch()
  })

  test('allows only one file to be drop with `multiple` not set', async () => {
    const spys = mockConsole()
    const { wrapper } = createWrapper()

    const file = createFile()
    const file2 = createFile()
    wrapper.vm.onFileDrop({
      dataTransfer: {
        files: [file, file2],
      },
    })

    expect(wrapper.vm.files.length).toBe(0)
    spys.unwatch()
  })
})
