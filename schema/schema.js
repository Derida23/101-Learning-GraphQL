const graphql = require('graphql');
const _ = require('lodash');
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = graphql;

var jurusanx = [
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

var data_mahasiswa = [
  {
    nama: "Aby Syahputra",
    umur: 22,
    id: "1",
    jurusanid: "3"
  },
  {
    nama: "Yunan Hemli",
    umur: 25,
    id: "2",
    jurusanid: "2"
  },
  {
    nama: "Andre Budiman",
    umur: 21,
    id: "3",
    jurusanid: "1"
  },
  {
    nama: "Charles Hakuto",
    umur: 26,
    id: "4",
    jurusanid: "1"
  },
  {
    nama: "Dino Saurus",
    umur: 24,
    id: "5",
    jurusanid: "2"
  },
  {
    nama: "Erick Kamaleng",
    umur: 20,
    id: "6",
    jurusanid: "3"
  }
];

//Schema
const JurusanType = new GraphQLObjectType({
  name: "jurusan",
  fields: () => ({
    id: { type: GraphQLID },
    jurusan: { type: GraphQLString },
    kaprodi: { type: GraphQLString },
    mahasiswa: {
        type: new GraphQLList(MahasiswaType),
        resolve(parent, args){
            return _.filter(data_mahasiswa, {jurusanid: parent.id});
        }
    }
  })
});

const MahasiswaType = new GraphQLObjectType({
  name: "mahasiswa",
  fields: () => ({
    id: { type: GraphQLID },
    nama: { type: GraphQLString },
    umur: { type: GraphQLInt },
    prodi: {
        type: JurusanType,
        resolve(parent, args){
            return _.find(jurusanx, {id: parent.jurusanid});
        }
    }
  })
});

// master direktori = root query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    prodi: {
      type: JurusanType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //tempat mengambil data dari database
        return _.find(jurusanx, { id: args.id }); //mengembalikan data
      }
    },
    mahasiswa: {
        type: MahasiswaType,
        args: { id: { type: GraphQLID }},
        resolve(parent,args) {
            return _.find(data_mahasiswa, { id: args.id});
        }
    }
  }
});

module.exports = new GraphQLSchema({
    query : RootQuery
});