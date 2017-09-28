export default {
  example: (state = { foo: 0 }, { type, payload }) => {
    switch (type) {
      case 'EXAMPLE_ACTION':
        return {
          ...state,
          foo: state.foo + 1,
        }
      default:
        return state
    }
  },
}
