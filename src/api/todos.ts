import {addDoc, collection, deleteDoc, doc, getDocs, updateDoc} from 'firebase/firestore';
import {db} from '../shared/firebase';
import {FirebaseTodo, Todo} from '../types/todo';

const todosRef = collection(db, 'todos');

export const getTodos = async (): Promise<Todo[]> => {
  const res = await getDocs(todosRef);
  const todos = res.docs.map(doc => ({id: doc.id, ...(doc.data() as FirebaseTodo)}));
  return todos;
};

export const createTodo = async (title: string, content: string): Promise<void> => {
  await addDoc(todosRef, {
    title: title,
    content: content,
    isDone: false,
  });
};

export const updateTodo = async (id: string, isDone: boolean): Promise<void> => {
  const todoRef = doc(todosRef, id);
  await updateDoc(todoRef, 'isDone', isDone);
};

export const deleteTodo = async (id: string): Promise<void> => {
  const todoRef = doc(todosRef, id);
  await deleteDoc(todoRef);
};
