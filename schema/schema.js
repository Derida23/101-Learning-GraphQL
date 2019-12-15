const graphql = require('graphql');
const _ = require('lodash');
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

var dummyJurusan = [
  {
    jurusan: "Teknik Komputer",
    kaprodi: "Alan Sherer",
    id: "1"
  },
  {
    jurusan: "Teknik Informatika",
    kaprodi: "Sony Steven",
    id: "2"
  },
  {
    jurusan: "Sistem Informasi",
    kaprodi: "Castelo Parejo",
    id: "3"
  }
];

const JurusanType = new GraphQLObjectType({
  name: "jurusan",
  fields: () => ({
    id: { type: GraphQLString },
    jurusan: { type: GraphQLString },
    kaprodi: { type: GraphQLString }
  })
});

// master direktori = root query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        prodi: {
            type: JurusanType,
            args: {id: {type: GraphQLString}},
            resolve(parent,args){
                //tempat mengambil data dari database
                return _.find(dummyJurusan,{id: args.id}); //mengembalikan data
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query : RootQuery
});