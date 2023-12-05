import Accueil from '../pages/Accueil'
import Catalog from '../pages/Catalog'
import Detail from '../pages/detail/Detail'

export const nav = [
    // Search
    {
        path: '/:category/:search/:keyword',
        name: "Catalogue",
        element: <Catalog />,
        isAuth: false
    },
    // Detail
    {
        path: '/:category/:id',
        name: "Detail",
        element: <Detail />,
        isAuth: false
    },
    // Category
    {
        path: '/:category',
        name: "Catalogue",
        element: <Catalog />,
        isAuth: false
    },
    // Home
    {
        path: '/',
        name: "Accueil",
        element: <Accueil />,
        isAuth: false
    }
]