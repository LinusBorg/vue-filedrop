import { mount } from '@vue/test-utils'

import FileDrop from '@/components/FileDrop'

export const createFile = (content = 'text') => {
  return new File([content], 'test.txt', { type: 'text/pain' })
}

export const mockConsole = () => {
  const spys = {
    error: jest.spyOn(global.console, 'error').mockImplementation(() => ({})),
    log: jest.spyOn(global.console, 'log').mockImplementation(() => ({})),
    warn: jest.spyOn(global.console, 'warn').mockImplementation(() => ({})),
    unwatch: () => {
      spys.error.mockRestore()
      spys.log.mockRestore()
      spys.warn.mockRestore()
    },
  }

  return spys
}

export const createWrapper = (options = {}) => {
  const fn = jest.fn()
  const instance = mount(FileDrop, {
    ref: 'filedrop',
    scopedSlots: {
      default: props => {
        fn(props)
        return null
      },
    },
    ...options,
  })

  return {
    fn,
    wrapper: instance,
  }
}
