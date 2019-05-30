import React, { Component } from "react";
import { View, StyleSheet } from 'react-native';
import { Spinner, Button, Text, Container, Header, Title, Icon, Body, Left, List, ListItem } from "native-base";

const Realm = require('realm');

class ListProduto extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      realm: null,
      produtos: []
      
    };
  }

  componentDidMount() {

    this.setState({loading: true}); 

    navigationListener = this.props.navigation.addListener('willFocus', () => {

      const realm = new Realm();

      let produtos = realm.objects('Produto').sorted('id', true);

      this.setState({ realm, produtos, loading: false })

    })

  }

  render() {
      
    if (this.state.loading){
      return (
        <View style={{ flex:1, justifyContent: 'center',alignItems: 'center' }}>
          <Spinner color='green' />
        </View>
      );
    }

    return (
      <Container style={styles.container}>
        <Header style={styles.header}>
          <Left style={styles.headerLeft}>
            <Button transparent onPress={() => this.props.navigation.goBack() }>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Produtos</Title>
          </Body>
        </Header>
        <View style={{paddingHorizontal: 15, paddingVertical: 10, flex: 1}}>

            <View style={{ flex: 1 }}> 
                <List
                dataArray={this.state.produtos}
                renderRow={data =>
                    <ListItem style={{ marginLeft: 0 }} thumbnail onPress={ ()=> { this.setState({ teste: 'a' }) } }>
                    <Left>
                        <Text>{data.id}</Text>
                    </Left>
                    <Body>
                        <Text>{data.nome}</Text>
                    </Body>
                    </ListItem>}
                />
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
  }

});

export default ListProduto;