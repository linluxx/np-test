import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import PropTypes from 'prop-types';

import { Autocomplete, TextField, CircularProgress } from '@mui/material';

import { selectCities, selectCity } from '../../redux/offices/selectors';
import { setCityName } from '../../redux/offices/slice';

const CitySelector = ({ getCityName }) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;

  const citiesList = useSelector(selectCities);
  const cityName = useSelector(selectCity);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
    setOptions(
      citiesList.map(item => {
        return { title: item.Description, id: item.CityID };
      })
    );
  }, [citiesList, open, cityName]);

  const onSelectChange = evt => {
    dispatch(setCityName(evt.target.innerText));
    getCityName(evt.target.innerText);
  };
  return (
    <Autocomplete
      id="city"
      autoSelect={true}
      onChange={onSelectChange}
      sx={{ width: 300, marginBottom: '24px' }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) => option.title === value.title}
      getOptionLabel={option => option.title}
      options={options}
      renderOption={(props, option) => (
        <li {...props} key={option.id}>
          {option.title}
        </li>
      )}
      renderInput={params => (
        <TextField
          {...params}
          color="secondary"
          label="Оберіть місто"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

CitySelector.propTypes = {
  getCityName: PropTypes.func.isRequired,
};

export default CitySelector;
