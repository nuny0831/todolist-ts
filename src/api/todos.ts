import {addDoc, collection, deleteDoc, doc, getDocs, updateDoc} from 'firebase/firestore';
import {db} from '../shared/firebase';

const todosRef = collection(db, 'todos');

export const getTodos = async () => {
  const res = await getDocs(todosRef);
  const todos = res.docs.map(doc => ({id: doc.id, ...doc.data()}));
  return todos;
};

export const createTodo = async (title: string, content: string): Promise<string> => {
  const res = await addDoc(todosRef, {
    title: title,
    content: content,
    isDone: false,
  });
  return res.id;
};

export const updateTodo = async (id: string, isDone: boolean) => {
  const todoRef = doc(todosRef, id);
  await updateDoc(todoRef, 'isDone', isDone);
};

export const deleteTodo = async (id: string) => {
  const todoRef = doc(todosRef, id);
  await deleteDoc(todoRef);
};
