// HOC pattern to "render-props"/"children-as-a-function" pattern adapter for reactApollo.graphql

import { gql, graphql } from 'react-apollo'
import PropTypes from 'prop-types'

export default function createApolloDataContainer (
  query,
  { withRef, shouldResubscribe } = {}
) {
  query = typeof query === 'string' ? gql`${query}` : query
  const options = props => props.options || {}
  const decorator = graphql(query, { options, withRef, shouldResubscribe })
  const Decoratee = props => props.render(props.data)
  const Decorated = decorator(Decoratee)
  Decorated.propTypes = {
    render: PropTypes.func.isRequired,
    options: PropTypes.object,
  }
  return Decorated
}
