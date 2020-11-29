import React, { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';

import LogoImg from '../../assets/images/logo.svg';
import backIcon from '../../assets/images/icons/back.svg';


import './styles.css';
import TeacherItem, { Teacher } from '../../components/teacheritem';
import Input from '../../components/input';
import Select from '../../components/Select';
import api from '../../services/api';


function TeacherList() {

  const [teachers, setTeachers] = useState([]);

  const [subject, setSubject] = useState('');
  const [week_day, setWeek_day] = useState('');
  const [time, setTime] = useState('');

  async function searchTeachers(e: FormEvent) {
    e.preventDefault();

    const response = await api.get('classes', {
      params: {
        subject,
        week_day,
        time,
      }
    })
    setTeachers(response.data);
  }

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponíveis." >

        <form id="search-teachers" onSubmit={searchTeachers}>
        <Select 
            name="subject"
            label="Matéria" 
            value={subject}
            onChange={e => { setSubject(e.target.value) }}
            options={[
              { value: 'Inglês', label: 'Inglês' },
              { value: 'Artes', label: 'Artes' },
              { value: 'Geográfia', label: 'Geográfia' },
              { value: 'Educação fisíca', label: 'Educação fisíca' },
              { value: 'Matemática', label: 'Matemática' },
              { value: 'Português', label: 'Português' },
              { value: 'Química', label: 'Química' },
            ]}
             />
        <Select 
            name="week_day"
            label="Dia da semana" 
            value={week_day}
            onChange={e => { setWeek_day(e.target.value) }}
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
             <Input type="time" 
             name="time" 
             label="hora" 
             value={time}
            onChange={e => { setTime(e.target.value) }}
             />
             <button type="submit">Procurar</button>
        </form>
      </PageHeader>
      <main>
        {teachers.map((teacher: Teacher) => {
          return <TeacherItem key={teacher.id} teacher={teacher} />;
        })}
      </main>
    </div>
  );
}

export default TeacherList;