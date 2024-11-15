import React, { useState } from 'react';
import Country from './Country';
import '../Countries.css';

function Countries({ countries }) {
  const [continentFilter, setContinentFilter] = useState('');
  const [subregionFilter, setSubregionFilter] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [isTop10, setIsTop10] = useState(false);

  const filteredCountries = countries
    .filter((country) => {
      if (continentFilter) return country.continents?.[0] === continentFilter;
      if (subregionFilter) return country.subregion === subregionFilter;
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

  const displayedCountries = isTop10
    ? filteredCountries.slice(0, 10)
    : filteredCountries;

  function handleContinentFilterChange(e) {
    setContinentFilter(e.target.value);
    setSubregionFilter('');
  }

  function handleSubregionFilterChange(e) {
    setSubregionFilter(e.target.value);
    setContinentFilter('');
  }

  function handleSortChange(e) {
    setSortOption(e.target.value);
  }

  return (
    <div className="countries-container">
      <div className="filters">
        <div className="filter">
          <label>Filter by Continent:</label>
          <select
            value={continentFilter}
            onChange={handleContinentFilterChange}
          >
            <option value="">All</option>
            <option value="Africa">Africa</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="North America">North America</option>
            <option value="South America">South America</option>
            <option value="Oceania">Oceania</option>
            <option value="Antarctica">Antarctica</option>
          </select>
        </div>
        <div className="filter">
          <label>Filter by Subregion:</label>
          <input
            type="text"
            placeholder="Enter subregion"
            value={subregionFilter}
            onChange={handleSubregionFilterChange}
          />
        </div>
        <div className="filter">
          <label>Sort:</label>
          <select value={sortOption} onChange={handleSortChange}>
            <option value="">None</option>
            <option value="alphabetical">Alphabetical</option>
            <option value="population">Population</option>
            <option value="area">Area</option>
          </select>
        </div>
        <div className="filter">
          <label>
            Top 10:
            <input
              type="checkbox"
              checked={isTop10}
              onChange={(e) => setIsTop10(e.target.checked)}
            />
          </label>
        </div>
      </div>

      <div className="countries-list">
        {displayedCountries.map((country, index) => (
          <Country key={index} country={country} />
        ))}
      </div>
    </div>
  );
}

export default Countries;
