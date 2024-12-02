// App.js
import React, { useEffect, useState } from 'react';
import '../Styles/global.css';
import '../Styles/sidebar.css';
import '../Styles/app.css';
import '../Styles/main.css';
import Notes from '../Components/Notes';
import '../Styles/Form.css';
import RadioButton from '../Components/RadioButton';
import { getAllAnnotations, createAnnotation, deleteAnnotation, updatePriority, getAnnotationsByPriority } from '../Services/AnnotationsService';
import AuthService from '../Services/AuthService';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  const [title, setTitles] = useState('');
  const [notes, setNotes] = useState('');
  const [allNotes, setAllNotes] = useState([]);
  const [selectedValue, setSelectedValue] = useState('all');

  useEffect(() => {
    getAllAnnotations().then((data) => {
      setAllNotes(data);
    });
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await createAnnotation(title, notes, false);

      setTitles('');
      setNotes('');

      if (selectedValue !== 'all') {
        loadNotes(selectedValue);
      } else {
        setAllNotes([...allNotes, response]);
      }
      setSelectedValue('all');
    } catch (error) {
      console.error('Erro ao criar anotação:', error);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteAnnotation(id);
      setAllNotes(allNotes.filter((note) => note._id !== id));
    } catch (error) {
      console.error('Erro ao deletar anotação:', error);

    }
  }

  // Função para carregar as anotações com base na prioridade
  async function loadNotes(options) {
    try {
      if (options !== 'all') {
        // Chame a função da API para obter anotações com base na prioridade
        const response = await getAnnotationsByPriority(options);
        setAllNotes(response);
      } else {
        // Se options for 'all', carregue todas as anotações
        getAllAnnotations().then((data) => {
          setAllNotes(data);
        });
      }
    } catch (error) {
      console.error('Erro ao carregar anotações com base na prioridade:', error);
    }
  }

  // Função para lidar com a mudança no RadioButton
  async function handleChange(e) {
    setSelectedValue(e.value);

    if (e.checked && e.value !== 'all') {
      loadNotes(e.value);
    } else {
      getAllAnnotations().then((data) => {
        setAllNotes(data);
      });
    }
  }

  async function handleChangePriority(id) {
    try {
      await updatePriority(id);

      // Atualize a lista de anotações no estado
      const updatedNotes = allNotes.map(note => {
        if (note._id === id) {
          // Esta é a anotação que acabamos de atualizar. Precisamos retornar uma nova versão com a prioridade atualizada.
          return {
            ...note,
            priority: !note.priority // Isso pressupõe que a prioridade é um valor booleano. Atualize de acordo com sua lógica.
          };
        } else {
          // Esta anotação não foi atualizada, então podemos retornar a versão original.
          return note;
        }
      });

      setAllNotes(updatedNotes);

      if (notes && selectedValue !== 'all') {
        loadNotes(selectedValue);
      } else if (notes) {
        getAllAnnotations();
      }
    } catch (error) {
      console.error('Erro ao mudar a prioridade:', error);
    }
  }

  //Responsável por fazer o logout do usuário e redirecioná-lo para a página de login
  async function handleLogout() {

    try {
      await AuthService.logout();
      sessionStorage.clear(); // Limpar completamente o sessionStorage
      navigate('/login'); // Redirecionar para a página de login após o logout
      window.location.reload(); // 
    } catch (error) {
      console.error('Erro durante o logout:', error);
    }
  }


  return (
    <div id="app">
      <aside>
        <strong>Caderno de Notas teste</strong>
        <form onSubmit={handleSubmit}>

          <div className="input-block">
            <label htmlFor="title">Titulo da Anotação</label>
            <input required maxLength="30" value={title} onChange={e => setTitles(e.target.value)} />
          </div>
          <div className="input-block">
            <label htmlFor="nota">Anotações</label>
            <textarea
              required
              value={notes}
              onChange={e => setNotes(e.target.value)} />
          </div>
          <button id="btn_submit" type="submit">Salvar</button>
        </form>
        <RadioButton
          selectedValue={selectedValue}
          handleChange={handleChange}
        />
        <button onClick={handleLogout}>Logout</button>
      </aside>

      <main>
        <ul>
          {allNotes.map(data => (
            <Notes
              key={data._id}
              data={data}
              handleDelete={handleDelete}
              handleChangePriority={handleChangePriority}
            />
          ))}

        </ul>
      </main>
    </div>
  );
}

export default App;
