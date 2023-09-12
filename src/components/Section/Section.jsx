import css from './Section.module.css';

export const Sectionh1 = ({ title, children }) => {
  return (
    <section className={css.section}>
      <h1>{title}</h1>             
      {children}
    </section>
  );
};

export const Sectionh2 = ({ title, children }) => {
  return (
    <section className={css.section}>
      <h2>{title}</h2>             
      {children}
    </section>
  );
};