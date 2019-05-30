import React, { Component } from "react";
import { View, StyleSheet } from 'react-native';
import { Button, Text, Container, Header, Title, Content, Icon, Body, Left, Form, Item, Input, Label } from "native-base";
import { Col, Row, Grid } from 'react-native-easy-grid';

const Realm = require('realm');

class FormProduto extends Component {

  constructor(props) {
    super(props);
    this.state = {
      realm: null,
      id:  '',
      nome: ''
      
    };
  }

  componentDidMount() {

    navigationListener = this.props.navigation.addListener('willFocus', () => {

      const realm = new Realm();
      this.setState({ realm }); 

    })

  }

  //INCREMENTA O ÚLTIMO ID DO BANCO
  getPrimaryKeyId(model) {
    if (this.state.realm.objects(model).max("id")) {
      return this.state.realm.objects(model).max("id") + 1;
    }
    return 1;
  }

 
  onSubmitProduto(){
  
    try {

        let idProduto = this.getPrimaryKeyId('Produto');

        this.state.realm.write(() => {

            this.state.realm.create('Produto', {

                id: parseInt(idProduto),
                nome: this.state.nome.toString()
            
            });

        });
    
        alert('Produto cadastrado com sucesso!');

        this.props.navigation.navigate('ListProduto');

      

    } catch (e) {

      console.log(e);
      alert("Erro bando de dados");
    }

  }

   render() {

    return (
      <Container style={styles.container}>
        <Header style={styles.header}>
          <Left style={styles.headerLeft}>
            <Button transparent onPress={() => this.props.navigation.goBack() }>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Produtos</Title>
          </Body>
        </Header>        
          <Content contentContainerStyle={{paddingHorizontal: 15, paddingVertical: 10}}>
              <Form>
                <Grid>
                  <Row>
                    <Col style={{ flex: 1 }}>
                      <Item stackedLabel style={styles.item}>
                        <Label>Nome</Label>
                        <Input value={this.state.nome} onChangeText={ value => this.setState({nome: value}) }/>
                      </Item>
                    </Col>
                  </Row>                 
                </Grid>
              </Form>            
          </Content>
          <View style={{ alignItems: 'flex-end', borderTopColor: '#ededed', borderTopWidth: 1, padding: 10 }}>
            <View>
              <Button style={{ backgroundColor: "#9400ff" }} onPress={() => { this.onSubmitProduto() }}>
                <Text> Cadastrar </Text>
              </Button>
            </View>  
          </View>        
      </Container>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    backgroundColor: "#fff"
  },
  header: {
    backgroundColor: '#ae35d6'
  },
  headerLeft: {
    marginRight: 10, 
    flex: 0,
  },
  item: {    
    marginLeft: 5,
    marginRight: 5,
  },
  textTel:{
    marginTop: 10,
    marginRight: 20,
  },
  erro: {
    fontSize: 12, 
    color: '#ff0000',
    marginLeft: 5,
  }


});

export default FormProduto;