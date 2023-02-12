import Phonebook from './Phonebook';
export const App = () => {
  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 38,
        color: '#010101',
      }}
    >
      <Phonebook />
    </div>
  );
};
