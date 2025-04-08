const { getPrismaClientDmmf } = require('nexus-prisma/dist-cjs/helpers/prisma')
const { ModuleGenerators } = require('nexus-prisma/dist-cjs/generator/ModuleGenerators/index')
const RuntimeSettings = require('nexus-prisma/dist-cjs/generator/Settings/Runtime/index')

const gentimeSettingsData = {
  "output": {
    "directory": "/home/dennis/Desktop/frens/api/prisma/generated/nexus-prisma",
    "name": "index"
  },
  "projectIdIntToGraphQL": "Int",
  "jsdocPropagationDefault": "guide",
  "docPropagation": {
    "GraphQLDocs": true,
    "JSDoc": true
  },
  "prismaClientImportId": "/home/dennis/Desktop/frens/api/prisma/generated/client"
}
const runtimeSettingsManager = RuntimeSettings.settings

const dmmf = getPrismaClientDmmf({
  // JSON stringify the values to ensure proper escaping
  // Details: https://github.com/prisma/nexus-prisma/issues/143
  // TODO test that fails without this code
  require: () => require("/home/dennis/Desktop/frens/api/prisma/generated/client"),
  importId: gentimeSettingsData.prismaClientImportId,
  importIdResolved: require.resolve("/home/dennis/Desktop/frens/api/prisma/generated/client")
})

const nexusTypeDefConfigurations = ModuleGenerators.JS.createNexusTypeDefConfigurations(dmmf, {
  gentime: gentimeSettingsData,
  runtime: runtimeSettingsManager,
})

module.exports = {
  $settings: RuntimeSettings.changeSettings,
  ...nexusTypeDefConfigurations,
}