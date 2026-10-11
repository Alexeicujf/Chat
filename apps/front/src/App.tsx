import { RouterProvider } from 'react-router';
import { router } from './config/route';
function App() {
	return <RouterProvider router={router} />;
}

export default App;
