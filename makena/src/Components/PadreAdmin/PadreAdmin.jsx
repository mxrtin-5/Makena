import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "../../firebase/config";
import Admin from "../../Pages/Admin/Admin";
import Login from "../../Pages/Login/Login";


const auth = getAuth(app);
const firestore = getFirestore(app);


const PadreAdmin = () => {

    const [user, setUser] = useState(null);

    async function getRol(uid) {
        const docuRef = doc(firestore, `usuarios/${uid}`);
        const docuCifrada = await getDoc(docuRef);
        const infoFinal = docuCifrada.data().rol;
        return infoFinal;
    }

    function setUserWithFirebaseAndRol(usuarioFirebase) {
        getRol(usuarioFirebase.uid).then((rol) => {
            const userData = {
                uid: usuarioFirebase.uid,
                email: usuarioFirebase.email,
                rol: rol,
            };
            setUser(userData);
            console.log("userData fianl", userData);
        });
    }

    onAuthStateChanged(auth, (usuarioFirebase) => {
        if (usuarioFirebase) {
            //funcion final

            if (!user) {
                setUserWithFirebaseAndRol(usuarioFirebase);
            }
        } else {
            setUser(null);
        }
    });

    return <>{user ? <Admin user={user} /> : <Login />}</>;
}

export default PadreAdmin;