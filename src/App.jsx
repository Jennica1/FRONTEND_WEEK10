import React, { useState, useEffect } from 'react';
import Country from './Components/Country';

function Countries() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [continentFilter, setContinentFilter] = useState('');
  const [subregionFilter, setSubregionFilter] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [isTop10, setIsTop10] = useState(false);

  const subregionOptions = [
    'Western Europe',
    'Eastern Europe',
    'Northern Europe',
    'Southern Europe',
    'Northern Africa',
    'Sub-Saharan Africa',
    'Caribbean',
    'Central America',
    'South America',
    'South-Eastern Asia',
    'Eastern Asia',
    'Central Asia',
    'Oceania',
    'Western Asia',
    'Northern America',
  ];

  // Fetch countries data based on subregion or fetch all if no subregion is selected
  useEffect(() => {
    async function fetchCountries() {
      try {
        const url = subregionFilter
          ? `https://restcountries.com/v3.1/subregion/${subregionFilter}`
          : 'https://restcountries.com/v3.1/all';
        const response = await fetch(url);
        const data = await response.json();
        setCountries(data);
      } catch (e) {
        console.error('Error fetching countries:', e.message);
      }
    }

    fetchCountries();
  }, [subregionFilter]);

  useEffect(() => {
    // Filter countries by continent and subregion
    const updatedCountries = countries
      .filter((country) => {
        if (continentFilter) {
          return country.continents?.[0] === continentFilter;
        }
        if (subregionFilter) {
          return country.subregion === subregionFilter;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortOption === 'alphabetical') {
          return a.name.common.localeCompare(b.name.common);
        } else if (sortOption === 'population') {
          return b.population - a.population;
        } else if (sortOption === 'area') {
          return b.area - a.area;
        }
        return 0;
      });

    setFilteredCountries(isTop10 ? updatedCountries.slice(0, 10) : updatedCountries);
  }, [countries, continentFilter, subregionFilter, sortOption, isTop10]);

  function handleContinentFilterChange(e) {
    setContinentFilter(e.target.value);
    setSubregionFilter(''); // Clear subregion filter
  }

  function handleSubregionFilterChange(e) {
    setSubregionFilter(e.target.value);
    setContinentFilter(''); // Clear continent filter
  }

  function handleSortChange(e) {
    setSortOption(e.target.value);
  }

  return (
    <div>
      <div>
        <h1>Countries of the world</h1>
        <label>
          Filter by Continent:
          <select value={continentFilter} onChange={handleContinentFilterChange}>
            <option value="">All</option>
            <option value="Africa">Africa</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="North America">North America</option>
            <option value="South America">South America</option>
            <option value="Oceania">Oceania</option>
            <option value="Antarctica">Antarctica</option>
          </select>
        </label>
        <label>
          Filter by Subregion:
          <select value={subregionFilter} onChange={handleSubregionFilterChange}>
            <option value="">All</option>
            {subregionOptions.map((subregion) => (
              <option key={subregion} value={subregion}>
                {subregion}
              </option>
            ))}
          </select>
        </label>
        <label>
          Sort:
          <select value={sortOption} onChange={handleSortChange}>
            <option value="">None</option>
            <option value="alphabetical">Alphabetical</option>
            <option value="population">Population</option>
            <option value="area">Area</option>
          </select>
        </label>
        <label>
          Top 10:
          <input
            type="checkbox"
            checked={isTop10}
            onChange={(e) => setIsTop10(e.target.checked)}
          />
        </label>
      </div>

      <div>
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country, index) => (
            <Country key={index} country={country} />
          ))
        ) : (
          <p>No countries match your criteria.</p>
        )}
      </div>
    </div>
  );
}

export default Countries;
