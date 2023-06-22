import { useContext, useState } from "react"
import React from 'react'
import FilterOptions from "../components/FilterOptions"
import { DataContext } from "../contexts/DataContext"
import getFromUrl from "../utils/getFromUrl"
import { ErrorContext } from "../contexts/ErrorContext"
import { Box } from "@mui/material"
import ListingComponent from "../components/ListingComponent"
import pokemonShuffler from "../utils/pokemonShuffler"

const ListingPage = () => {
  const { filters, updateFilters, pokemonList } = useContext(DataContext)
  const { showError } = useContext(ErrorContext)

  const [selectedFilterType, setSelectedFilterType] = useState('')
  const [selectedOption, setSelectedOption] = useState(null)
  const [options, setOptions] = useState([])
  const [filteredPokemons, setFilteredPokemons] = useState(pokemonList.map(item => item.id))

  const getFilterOptions = async (ele) => {
    if(ele.url){
      let data = await getFromUrl(ele.url, showError)
      if(data.next){
        const newUrl = ele.url + '?limit=' + data.count
        data = await getFromUrl(newUrl, showError)
      }
      let filterCopy = filters
      let eleCopy = ele
      let ind = filterCopy.indexOf(ele)
      delete eleCopy.url
      eleCopy.results = data.results
      setOptions(data.results)
      setSelectedFilterType(ele.name)
      filterCopy.splice(ind, 1, eleCopy)
      updateFilters(filterCopy)
    } else {
      setOptions(ele.results)
    }
  }

  const handleFilterTypeChange = (value) => {
    console.log(value)
    setFilteredPokemons([])
    setSelectedOption(null)
    if(value === ''){
      setFilteredPokemons(pokemonList.map(item => item.id))
      setSelectedFilterType('')
      setOptions([])
    } else if(value === 'random'){
      setSelectedFilterType('random')
      setFilteredPokemons(pokemonShuffler(pokemonList.map(item => item.id)))
      setOptions([])
    } else {
      let ele = filters.find(item => item.name === value)
      setSelectedFilterType(ele.name)
      getFilterOptions(ele)
    }
  }

  const handleOptionChange = async (value) => {
    setSelectedOption(value)
    let data = await getFromUrl(value.url)
    let pokemons = []
    let iterable = data.pokemon_species ? data.pokemon_species : data.pokemon
    console.log(iterable)
    // console.log(data)
    iterable.forEach((item) => {
      let pokemonId = item.url ? item.url.split('/').at(-2) : item.pokemon.url.split('/').at(-2)
      pokemons.push(parseInt(pokemonId, 10))
    })
    setFilteredPokemons(pokemons)
  }

  return (
    <div>
      <Box>
      <FilterOptions
        filterTypes={filters.map((item) => item.name)}
        selectedFilterType={selectedFilterType}
        options={options}
        selectedOption={selectedOption}
        onFilterTypeChange={handleFilterTypeChange}
        onOptionChange={handleOptionChange}
      />
      </Box>
      <Box paddingTop="20px">
        <ListingComponent
          identifiers={filteredPokemons}
          loadMore={true}
        />
      </Box>
    </div>
  )
}

export default ListingPage