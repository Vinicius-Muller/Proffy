import React,{ useState, FormEvent } from 'react';
import './styles.css';

import PageHeader from '../../components/PageHeader';
import Textarea from '../../components/TextArea';
import Select from '../../components/Select';

import Input from '../../components/input';

import warningIcon from '../../assets/images/icons/warning.svg';
import api from '../../services/api';
import { useHistory } from 'react-router-dom';


function TeacherForm() {

  const history = useHistory();

  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');

  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');
  
  const [scheduleItems, setScheduleItems] = useState([
    
    { week_day: 0,from: '',to:'' }
  ]);
  
  function addNewScheduleItem() {
    setScheduleItems([
      ...scheduleItems,
      { week_day: 0,from: '',to:'' }
    ]);
  }

  function setScheduleItemValue(position: Number,field: string, value:string) {
    const updatedScheduleItem = scheduleItems.map((scheduleItem, index,) => {
      if (index === position) {
        return { ...scheduleItem, [field]: value };
      }
      return scheduleItem
    });
    setScheduleItems(updatedScheduleItem);
  }

  function handleCreateClass(e: FormEvent) {
    e.preventDefault();
  }
  api.post('classes',{
  name,
  avatar,
  whatsapp,
  bio,
  subject,
  cost: Number(cost),
  schedule: scheduleItems
  }).then(() => {
    alert('Cadastro realizado com sucesso');
    history.push('/');
  }).catch(() => {
    alert('Erro no cadastro');
  })

  return (
    <div id="page-teacher-form" className="container">
    <PageHeader 
        title="Que incrivel que você quer dar aula." 
        description="O primeiro passo é preencher esse formulário de inscrição."
        />

        <main>
          <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>

            <Input name="name" label="Nome completo" 
            value={name} 
            onChange={(e) => { setName(e.target.value) }} />

            <Input name="avatar" label="avatar"
            value={avatar} 
            onChange={(e) => { setAvatar(e.target.value) }} 
            />

            <Input name="whatsapp" label="whatsapp"
            value={whatsapp} 
            onChange={(e) => { setWhatsapp(e.target.value) }} 
            />

            <Textarea name="bio" label="biografia"
            value={bio} 
            onChange={(e) => { setBio(e.target.value) }} 
            />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>

            <Select 
            name="subject"
            label="Matéria" 
            value={subject}
            onChange={(e)=> {setSubject(e.target.value)}}
            options={[
              { value: 'Artes', label: 'Artes' },
              { value: 'Biologia', label: 'Biologia' },
              { value: 'Ciências', label: 'Ciências' },
              { value: 'Educação física', label: 'Educação física' },
              { value: 'Geografia', label: 'Geografia' },
              { value: 'Matemática', label: 'Matemática' },
              { value: 'Português', label: 'Português' },
              { value: 'Quimica', label: 'Quimica' },
            ]}
             />
            <Input 
            value={cost}
            onChange={(e)=> {setCost(e.target.value)}} name="cost" label="Custo da sua hora por aula" />

            <fieldset>
              <legend>Horários disponiveis
              <button type="button" onClick={addNewScheduleItem}>
                + Novo horário
              </button>
              </legend>

            {scheduleItems.map((scheduleItem, index) => {
              return (
                <div key={scheduleItem.week_day} className="schedule-item">
                <Select 
                   name="week_day"
                   label="Dia da semana" 
                   value={ scheduleItem.week_day }
                   onChange={ e => setScheduleItemValue(index, 'week_day', e.target.value) }
                   options={[
                     { value: '0', label: 'Domingo' },
                     { value: '1', label: 'Segunda-feira' },
                     { value: '2', label: 'Terça-feira' },
                     { value: '3', label: 'Quarta-feira' },
                     { value: '4', label: 'Quinta-feira' },
                     { value: '5', label: 'Sexta-feira' },
                     { value: '6', label: 'Sábado' },
                   ]}
                />
                <Input name="from" 
                label="Das" 
                type="time"
                value={ scheduleItem.from}
                onChange={ e => setScheduleItemValue(index, 'from', e.target.value) }
                />
                <Input name="to" 
                label="Até" 
                type="time" 
                value={ scheduleItem.to }
                onChange={ e => setScheduleItemValue(index, 'to', e.target.value) }
                />
                </div>
              );
            })}
              
            </fieldset>

          </fieldset>
          <footer>
            <p>
            <img src= { warningIcon }  alt="Aviso importante"/> 
            importante ! <br />
            preencha todos os dados
            </p>
            <a href={'https://wa.me/${teacher.whatsapp}'}>
            Salvar cadastro
            </a>
          </footer>
          </form>
        </main>
  </div>
  
  )
}


export default TeacherForm;