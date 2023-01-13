const Number = ({name, number}) => <li>{name} {number}</li>

const Persons = ({persons, nameFilter}) => 
<ul>
  {persons
    .filter(x => x.name.toLowerCase().includes(nameFilter.toLowerCase()))
    .map(x => <Number key={x.name} name={x.name} number={x.number}/>)
  }
</ul>

export default Persons