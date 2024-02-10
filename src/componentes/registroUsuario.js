import React, { useState, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { UrlUsuarios } from '../url/urlSitioWeb';
import { useNavigate } from 'react-router-dom';
import ToastMessage from '../utilidad/Toast'; // Toast 
import ReCAPTCHA from 'react-google-recaptcha';

function RegistroUsuario() {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [telefono, setTelefono] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const history = useNavigate();
    const [showToast, setShowToast] = useState(false);
    const [message, setMessage] = useState('');
    const [toastColor, setToastColor] = useState('');
    const [showError, setShowError] = useState(false);

    const [captchaValido, cambiarCaptchaValido] = useState(null);
    const captcha = useRef(null);

    const onChange = () => {
        if (captcha.current.getValue()) {
            console.log('El usuario no es robot')
            cambiarCaptchaValido(true);
        }
    }


    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const showToastMessage = (message, toastColor) => {
        setMessage(message);
        setToastColor(toastColor);
        setShowToast(true);

        setTimeout(() => {
            setShowToast(false);
        }, 5000);
    };

    const passwordValidation = () => {
        return (
            password.length >= 8 &&
            /[a-z]/.test(password) &&
            /[A-Z]/.test(password) &&
            /\d/.test(password) &&
            /[!@#$%^&*(),.?":{}|<>]/.test(password)
        );
    };

    const getPasswordErrorMessage = () => {
        let errorMensaje = 'La contraseña debe tener al menos:';

        if (password.length < 8) {
            errorMensaje += ' 8 caracteres.';
        }

        if (!/[a-z]/.test(password)) {
            errorMensaje += ' Una letra minúscula.';
        }

        if (!/[A-Z]/.test(password)) {
            errorMensaje += ' Una letra mayúscula.';
        }

        if (!/\d/.test(password)) {
            errorMensaje += ' Un número.';
        }

        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            errorMensaje += ' Un carácter especial (@#$%^&*).';
        }

        return errorMensaje;
    };



    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setShowError(false);

        if (!nombre || !apellido || !correo || !telefono || !password || !captchaValido) {
            setShowError(true);
            return;
        }

        // if (!nombre || !/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]{2,}$/.test(nombre)) {
        //     showToastMessage('El nombre debe contener más de 2 letras.', 'error');
        //     return;
        // }

        // if (!apellido || !/^[a-zA-ZáéíóúÁÉÍÓÚüÜ\s]+$/u.test(apellido)) {
        //     showToastMessage('El apellido debe contener solo letras y espacios.', 'error');
        //     return;
        // }

        // const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // if (!correoRegex.test(correo)) {
        //     showToastMessage('Por favor, introduce una dirección de correo electrónico válida.', 'error');
        //     return;
        // }

        // if (telefono.length === 0 || telefono.length !== 10 || !/^[0-9]+$/.test(telefono)) {
        //     showToastMessage('El número de teléfono debe contener 10 dígitos numéricos.', 'error');
        //     return;
        // }

        if (!passwordValidation()) {
            showToastMessage(getPasswordErrorMessage(), 'error');
            return;
        }

        try {
            const response = await fetch(UrlUsuarios);
            const usuarios = await response.json();

            if (usuarios.find(u => u.correo === correo)) {
                showToastMessage('El correo ya existe. Utiliza otro', 'warning');
                return;
            }

            await fetch(UrlUsuarios, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre: nombre,
                    apellido: apellido,
                    correo: correo,
                    contraseña: password,
                    numeroTelefono: telefono
                }),
            });

            alert('Registro exitoso. Se enviará un correo para activar tu cuenta.');

            setNombre('');
            setApellido('');
            setTelefono('');
            setCorreo('');
            setPassword('');

            history('/login');

            showToastMessage('¡Bienvenido! Gracias por registrarte.', 'success');
        } catch (error) {
            console.error('Error al agregar datos:', error);
            showToastMessage('Error al agregar datos!', 'error');
        }

        if (captcha.current.getValue()) {
            console.log('El usuario no es robot')
            cambiarCaptchaValido(true);
        } else {
            console.log('Acepta el captcha');
            cambiarCaptchaValido(false);
        }
    };

    return (
        <>
            <ToastMessage
                showToast={showToast}
                message={message}
                onClose={() => setShowToast(false)}
                toastColor={toastColor}
            />
            <div className="container">
                <div className="row justify-content-center m-3">
                    <div className="col-md-5 border">
                        <Form onSubmit={handleSubmit}>
                            <h2 className="m-2 text-center">Registro</h2>

                            {/* Campo Nombre */}
                            <Form.Group className="mb-1" controlId="nombre">
                                <Form.Label>Nombre</Form.Label>
                                <div className="input-group">
                                    <span className="input-group-text" id="basic-addon1"><i className="fa fa-id-card"></i></span>
                                    <input
                                        type="text"
                                        className={`form-control ${showError && !nombre ? 'is-invalid' : !/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]{2,}$/.test(nombre) ? '' : ''}`}
                                        placeholder="Ingresa tu nombre"
                                        aria-describedby="basic-addon1"
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                    />
                                </div>
                                {showError && !nombre && (
                                    <Form.Text className="text-danger">
                                        Ingrese su nombre completo.
                                    </Form.Text>
                                )}
                                {nombre && !/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]{2,}$/.test(nombre) && (
                                    <Form.Text className="text-danger">
                                        El nombre debe contener más de 2 letras.
                                    </Form.Text>
                                )}
                            </Form.Group>

                            {/* Campo Apellido */}
                            <Form.Group className="mb-1" controlId="apellido">
                                <Form.Label>Apellido</Form.Label>
                                <div className="input-group">
                                    <span className="input-group-text" id="basic-addon1"><i className="fa fa-id-card"></i></span>
                                    <input
                                        type="text"
                                        className={`form-control ${showError && !apellido ? 'is-invalid' : !/^[a-zA-ZáéíóúÁÉÍÓÚüÜ\s]{2,}$/u.test(apellido) ? '' : ''}`}
                                        placeholder="Ingresa tu apellido"
                                        aria-describedby="basic-addon1"
                                        value={apellido}
                                        onChange={(e) => { setApellido(e.target.value) }}
                                    />
                                </div>
                                {showError && !apellido && (
                                    <Form.Text className="text-danger">
                                        Ingrese su apellido.
                                    </Form.Text>
                                )}
                                {apellido && !/^[a-zA-ZáéíóúÁÉÍÓÚüÜ\s]{2,}$/u.test(apellido) && (
                                    <Form.Text className="text-danger">
                                        El apellido debe contener solo letras.
                                    </Form.Text>
                                )}
                            </Form.Group>

                            {/* Campo Teléfono */}
                            <Form.Group className="mb-1" controlId="usuario">
                                <Form.Label>Telefono</Form.Label>
                                <div className="input-group">
                                    <span className="input-group-text" id="basic-addon1"><i className="fa fa-phone"></i></span>
                                    <input
                                        type="text"
                                        className={`form-control ${showError && telefono.length === 0 ? 'is-invalid' : telefono.length !== 10 || !/^[0-9]+$/.test(telefono) ? '' : ''}`}
                                        placeholder="Ingresa número de teléfono."
                                        aria-describedby="basic-addon1"
                                        value={telefono}
                                        onChange={(e) => {
                                            const input = e.target.value;
                                            if (/^[0-9]{0,10}$/.test(input)) {
                                                setTelefono(input);
                                            }
                                        }}
                                    />
                                </div>
                                {showError && !telefono && (
                                    <Form.Text className="text-danger">
                                        Ingrese su telefono.
                                    </Form.Text>
                                )}
                                {telefono.length > 0 && !/^[0-9]{10}$/.test(telefono) && (
                                    <Form.Text className="text-danger">
                                        El número de teléfono debe contener exactamente 10 dígitos.
                                    </Form.Text>
                                )}
                            </Form.Group>

                            {/* Campo Correo Electrónico */}
                            <Form.Group className="mb-1" controlId="correo">
                                <Form.Label>Correo Electrónico</Form.Label>
                                <div className="input-group">
                                    <span className="input-group-text" id="basic-addon1"><i className="fa fa-envelope"></i></span>
                                    <input
                                        type="email"
                                        className={`form-control ${showError && !correo ? 'is-invalid' : !isValidEmail(correo) ? '' : ''}`}
                                        placeholder="Ingresa tu correo electrónico"
                                        aria-describedby="basic-addon1"
                                        value={correo}
                                        onChange={(e) => setCorreo(e.target.value)}
                                    />
                                </div>
                                {showError && !correo && (
                                    <Form.Text className="text-danger">
                                        Ingrese su correo.
                                    </Form.Text>
                                )}
                                {correo && !isValidEmail(correo) && (
                                    <Form.Text className="text-danger">
                                        Ingresa una dirección de correo electrónico válida.
                                    </Form.Text>
                                )}
                                {/* <Form.Label>Contraseña</Form.Label> */}
                            </Form.Group>

                            {/* Campo Contraseña */}
                            <Form.Group className="input-group mb-1" controlId="password">
                                <Form.Label>Contraseña</Form.Label>
                                <div className="input-group">
                                    <span className="input-group-text" id="basic-addon1"><i className="fa fa-lock"></i></span>
                                    <Form.Control
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Ingresa tu contraseña"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className={`form-control ${showError && !passwordValidation() ? 'is-invalid' : ''}`}
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={handleShowPassword}
                                    >
                                        {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                                    </button>
                                </div>
                                {showError && !password && (
                                    <Form.Text className="text-danger">
                                        Ingrese una contraseña.
                                    </Form.Text>
                                )}
                                {password && !passwordValidation() && (
                                    <Form.Text className="text-danger">
                                        {getPasswordErrorMessage()}
                                    </Form.Text>
                                )}
                            </Form.Group>
                            <ReCAPTCHA
                                className='justify-content-center mt-2'
                                ref={captcha}
                                sitekey="6Le-PmwpAAAAAInOld5TUzpt83IsG2Wc77QNX8TP"
                                onChange={onChange}
                            />

                            {showError && !captchaValido && (
                                <Form.Text className="text-danger">
                                    Acepta el captcha.
                                </Form.Text>)}

                            <div className=''>
                                <div className="text-center m-3 mb-3 d-grid mx-auto">
                                    <button className='btn' style={{ color: 'white', background: '#daa232' }} type="submit">
                                        Registrarse
                                    </button>
                                </div>
                            </div>

                        </Form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RegistroUsuario;
