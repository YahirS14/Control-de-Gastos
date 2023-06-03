import { useState } from 'react';
import Header from './components/Header';
import ListadoGastos from './components/ListadoGastos';
import Modal from './components/Modal';
import { generarId } from './helpers';
import iconoNuevoGasto from './img/nuevo-gasto.svg';

function App() {
  const [presupuesto, setPresupuesto] = useState(0);
  const [presupuestoValido, setPresupuestoValido] = useState(false);

  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);

  const [gastos, setGastos] = useState([]);

  const handelNuevoGasto = () => {
    setModal(true);

    setTimeout(() => {
      setAnimarModal(true);
    }, 500);
  }

  const guardarGasto = gasto => {
    gasto.id = generarId();
    gasto.fecha = Date.now();
    setGastos([...gastos, gasto]);

    //Cerrar Modal
    setAnimarModal(false);
    setTimeout(() => {
      setModal(false);
    }, 500);
  }

  return (
    <>
      <div className={modal ? 'fijar' : ''}>
        <Header
          presupuesto={presupuesto}
          setPresupuesto={setPresupuesto}
          presupuestoValido={presupuestoValido}
          setPresupuestoValido={setPresupuestoValido}
        />

        {presupuestoValido && (
          <>
            <main>
              <ListadoGastos 
                gastos={gastos}
              />
            </main>
            <div className='nuevo-gasto'>
              <img
                src={iconoNuevoGasto}
                alt="Icono Nuevo Gasto"
                onClick={handelNuevoGasto}
              />
            </div>
          </>
        )}

        {modal && <Modal
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}>
        </Modal>}

      </div>
    </>
  )
}

export default App
