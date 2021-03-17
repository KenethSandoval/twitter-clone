import Reac from 'react';
import './Home.scss';
import BasicLayout from '../../layout/BasicLayout';

export default function Home(props) {
  const { setRefreshCheckLogin } = props;
  return (
    <BasicLayout className="home" setRefreshCheckLogin={setRefreshCheckLogin}>
        <h2>Estamos en la page Home</h2>
    </BasicLayout>
  )
}

