export const resolvers = {
  Query: {
    viewer(_parent: any, _args: any, _context: any, _info: any) {
      console.log('QUERY')
      return { id: 1, name: 'John Smith', status: 'cached' }
    },
  },
}
