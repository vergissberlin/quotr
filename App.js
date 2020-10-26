import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { ActivityIndicator, Alert, Platform, SafeAreaView, StyleSheet, Text,View } from 'react-native';

import Firebase from './js/Firebase'
import Message from './js/components/Message'
import NewQuote from './js/components/NewQuote'
import StyledButton from './js/components/StyledButton'
import Quote from './js/components/Quote'

export default class App extends Component {
  state = {
    index: 0,
    isLoading: true,
    showNewQuoteScreen: false,
    quotes: []
  };

  /**
   * Read data from firestore
   */
  _dataRetrieve = async() => {
    let quotes = [];
    let query = await Firebase.db.collection('quotes').get();
    query.forEach(quote => {
      quotes.push({
        id: quote.id,
        quote: quote.data().quote,
        author: quote.data().author
      });
    });
    this.setState({quotes, isLoading: false})
  }

  /**
   * Save data in firestore
   */
  _dataSave = async(quote,author,quotes) => {
    docRef = await Firebase.db.collection('quotes').add({quote, author})
    quotes[quotes.length - 1].id = docRef.id
  }

  /**
   * Delete data from firestore
   * 
   * @param String id The firebase id of the quote
   * @returns void
   */
  _dataRemove(id) {
    Firebase.db.collection('quotes').doc(id).delete()
    this.setState({index: 0})
  }

  /**
   * Button to add a quote
   * 
   * @param String quote 
   * @param String author 
   * @returns void
   */
  _quoteAdd = (quote, author) => {
    let { quotes } = this.state;
    if (quote && author) {
      quotes.push({ quote, author })
      this._dataSave(quote, author, quotes)
      this.setState({index: quotes.length - 1, showNewQuoteScreen: false, quotes})
    } 
    //console.log(quotes)
  }

  /**
   * Button to show the next quote in the row
   * 
   * @param {Array} quotes All quotes
   * @param {Number} index Array index of quotes
   * @returns void
   */
  _quoteNext(quotes, index) {
    let nextIndex = index + 1 >= quotes.length ? 0 : index + 1
    this.setState({ index: nextIndex })
  }

  /**
   * Button to delete the current visible quote
   * @param {String} id of the quote
   * @returns void
   */
  _quoteDelete(id) {
    Alert.alert('Delete the quote?', 'You can not undo this.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => this._dataRemove(id) },
    ])
  }

  /**
   * Render the screen
   */
  render() {
    if (!this.state.isLoading) {
      return (
        <View style={styles.container}>
          <StatusBar style="light" />
          <ActivityIndicator size='large' color='#189' />
        </View>
      )
    }

    const { index, quotes } = this.state;
    const quote = quotes[index];
    let nextIndex = index + 1;
    return (
			<SafeAreaView style={styles.container}>
				<StatusBar style="light" />
				<NewQuote visible={this.state.showNewQuoteScreen} onSave={this._quoteAdd} />
        {quote === undefined ?
          (<Message header="Huhu" content="Kein Zitat vorhanden."/>) :
          (<Quote quote={quote.quote} author={quote.author} />)
        }
        <StyledButton 
          title="Delete"
          style={styles.btnDelete}
          visible={quotes.length >= 1}
          onPress={() => this._quoteDelete(quote.id)} />
				<StyledButton
					title="New"
					style={styles.btnNew}
					visible={true}
					onPress={() => this.setState({ showNewQuoteScreen: true })}
				/>
				<StyledButton
					title="Next"
					style={styles.btnNext}
					visible={quotes.length >= 2}
					onPress={() => this._quoteNext(quotes, index)}
				/>
			</SafeAreaView>
		)
  }

  /**
   * When component is mounted
   */
  componentDidMount() {
    Firebase.init()
    this._dataRetrieve()
  }

  /**
   * When data has updated
   */
  componentDidUpdate() {
    this._dataRetrieve()
  }
}

/**
 * Styles
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 42,
    backgroundColor: '#223'
  },
  btnDelete: {
    position: 'absolute',
    top: 30,
    left: 20
  },
  btnNew: {
    position: 'absolute',
    top: 30,
    right: 20
  },
  btnNext: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 30 : 0,
  }
});
