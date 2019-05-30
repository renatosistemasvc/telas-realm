import React from "react";
import { Root } from "native-base";
import { createAppContainer, createStackNavigator } from "react-navigation";

const Realm = require('realm');

/*** TELAS CLIENTE ***/
import FormCliente from "./src/components/cliente/FormCliente";

/*** TELAS PRODUTO ***/
import ListProduto from "./src/components/produto/ListProduto";
import FormProduto from "./src/components/produto/FormProduto";

const AppNavigator = createStackNavigator({
 
    FormCliente: {  screen: FormCliente },    
 
    ListProduto: {  screen: ListProduto },
    FormProduto: {  screen: FormProduto },
    
    },
    {
      initialRouteName: "FormCliente",
      headerMode: "none"
    }
);


const ClienteSchema = {
  name: 'Cliente',
  primaryKey: 'id',
  properties: {
    id:  {type: 'int'},    
    cpf: {type: 'string', optional: true},
    rg: {type: 'string', optional: true},
    nome: {type: 'string', optional: true}  
  }
};

const ProdutoSchema = {
  name: 'Produto',
  primaryKey: 'id',
  properties: {
    id:  {type: 'int'},
    nome: {type: 'string', optional: true}    
  }
};

Realm.open({ schema: [ClienteSchema, ProdutoSchema] });

const AppContainer = createAppContainer(AppNavigator);

export default () =>
  <Root>
    <AppContainer />
  </Root>;