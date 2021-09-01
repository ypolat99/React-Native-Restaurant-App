import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import SearchBar from '../components/SearchBar';
import useResults from '../hooks/useResults';
import ResultsList from '../components/ResultsList';

const SearchScreen = () => {
  const [term, setTerm] = useState('');
  const [searchApi, results, errorMessage] = useResults();

  const filterResultsByPrice = (price) =>
  {
    //price == $ or $$ or $$$
    return results.filter(result => {
      return result.price === price;
    });
  };


  return (
    <>
      <SearchBar
        term={term}
        onTermChange={setTerm}
        onTermSubmit={() => searchApi(term)}
      />
      {errorMessage ? <Text>{errorMessage}</Text> : null}
      <Text style= {{marginLeft:15}}>We have found {results.length} results</Text>

      <ScrollView>
        <ResultsList title = "Cost Effective" results = {filterResultsByPrice("$")}  />
        <ResultsList title = "Bit Pricier" results = {filterResultsByPrice("$$")}  />
        <ResultsList title = "Big Spender" results = {filterResultsByPrice("$$$")}  />
        <ResultsList title = "We Go Big Tonight" results = {filterResultsByPrice("$$$$")} />
      </ScrollView>


    </>
  );
};

const styles = StyleSheet.create({});

export default SearchScreen;
