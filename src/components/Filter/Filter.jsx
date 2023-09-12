import css from './Filter.module.css';

export const Filter = ({ name, handleFilterChange }) => {
  return (
    <>
      <p className={css.titlefind}>Find contacts by name</p>
      <input
        type="text"
        name="filter"
        value={name}
        onChange={handleFilterChange}
        className={css.formfind}
      />
    </>
  );
};