import React from 'react'
import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import DatePicker from "react-datepicker";
import { supabase } from '../supabaseClient'
import Arrow from '../assets/arrow.png'

function ProductForm(props) {
  const [step, setStep] = useState(1);
  const [servi, setServi] = useState([])
  const [servicio, setServicio] = useState("");
  const [fecha, setFecha] = useState(null);
  const [hora, setHora] = useState("");
  const [mensaje, setMensaje] = useState("");

  const horasDisponibles = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00"];

  const guardarCita = () => {

  supabase
    .from("Citas")
    .select("*")
    .eq('servicio', servicio)
    .eq('fecha', fecha.toISOString().split("T")[0])
    .eq('hora', hora)
    .then(({ data: existentes, error }) => {
      if (error) {
        console.error('Error buscando citas:', error)
        alert('Error consultando citas')
        return;
      }

      if (existentes.length > 0) {
        alert('Ya existe una cita en esa fecha y hora')
        return;
      }

      supabase
        .from("Citas")
        .insert([
          {
            servicio,
            fecha: fecha,
            hora,
          },
        ])
        .then(({ error }) => {
          if (error) {
            console.error('Error insertando:', error)
            alert("Error al guardar. Intenta con otra hora.");
          } else {
            alert("¡Cita guardada exitosamente!");
            setStep(1);
            setServicio("");
            setFecha(null);
            setHora("");
          }
        });
    });
};
  return (
   <>
   <div className='flex flex-col justify-evenly h-[854px] w-[425px] bg-gradient-to-b from-[#F06A3E] to-white'>
    <Link to='/'><img className=' ml-2.5' src={Arrow}/></Link>
    <div className='border-b-2 border-[#0F0F17] pb-2'>
        <h1 className='text-4xl ml-2.5'>CHOOSE A DATE</h1>
    </div>
    <div className="max-w-xs mx-auto rounded-lg shadow p-4">
      <h2>Agendar cita</h2>
      {step === 1 && (
        <div>
          <p>1️⃣ Escoge un servicio:</p>
          <select value={servicio} onChange={e => setServicio(e.target.value)}>
            <option value="">Selecciona</option>
            <option value="Manicura">Manicura</option>
            <option value="Pedicura">Pedicura</option>
            <option value="Depilación">Depilación</option>
          </select>
          <br /><br />
          <button disabled={!servicio} onClick={() => setStep(2)}>
            Siguiente
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <p>📅 2️⃣ Escoge el día del mes:</p>
          <DatePicker
          className='flex justify-between'
            selected={fecha}
            onChange={date => setFecha(date)}
            inline
          />
          <br />
          <button disabled={!fecha} onClick={() => setStep(3)}>
            Siguiente
          </button>
        </div>
      )}

      {step === 3 && (
        <div>
          <p>⏰ 3️⃣ Escoge la hora:</p>
          <select value={hora} onChange={e => setHora(e.target.value)}>
            <option value="">Selecciona una hora</option>
            {horasDisponibles.map(h => (
              <option key={h} value={h}>{h}</option>
            ))}
          </select>
          <br /><br />
          <button disabled={!hora} onClick={guardarCita}>
            Guardar cita
          </button>
        </div>
      )}

      {mensaje && <p style={{ marginTop: "20px" }}>{mensaje}</p>}
    </div>
   </div>
   </>
  )
}

export default ProductForm