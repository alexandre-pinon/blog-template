import gql from 'graphql-tag'
import Link from 'next/link'
import { useQuery } from '@apollo/client'
import { initializeApollo } from '../lib/apollo/client'

const ViewerQuery = gql`
  query ViewerQuery {
    viewer {
      id
      name
      status
    }
  }
`

const Test = () => {
  const { data } = useQuery(ViewerQuery)
  console.log({data});

  return (
    <div>
      You're signed in as {data?.viewer.name} and you're {data?.viewer.status} goto{' '}
      <Link href="/">
        <a>static</a>
      </Link>{' '}
      page.
    </div>
  )
}

export default Test

export async function getStaticProps() {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: ViewerQuery,
  })

  const initialApolloState = apolloClient.cache.extract()
  console.log({ initialApolloState })

  return {
    props: {
      initialApolloState,
    },
  }
}
