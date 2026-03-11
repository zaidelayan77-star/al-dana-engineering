import { Toaster } from 'react-hot-toast';

export default function ToastProvider() {
    return <Toaster
        position="top-right"
        toastOptions={{
            style: {
                whiteSpace: 'pre-line',
            },
        }}
    />;
}