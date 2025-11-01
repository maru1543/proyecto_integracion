CREATE TABLE usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    salt VARCHAR(255),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ultimo_acceso DATETIME,
    tema_preferido ENUM('claro','oscuro') DEFAULT 'claro',
    activo TINYINT(1) DEFAULT 1,
    token_recuperacion VARCHAR(255),
    fecha_expiracion_token DATETIME
);

CREATE TABLE asignatura (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    color VARCHAR(7),
    icono VARCHAR(50)
);

CREATE TABLE usuario_has_asignatura (
    usuario_id INT NOT NULL,
    asignatura_id INT NOT NULL,
    PRIMARY KEY (usuario_id, asignatura_id),
    FOREIGN KEY (usuario_id) REFERENCES usuario(id),
    FOREIGN KEY (asignatura_id) REFERENCES asignatura(id)
);

CREATE TABLE evento (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descripcion TEXT,
    fecha_limite DATETIME,
    prioridad ENUM('baja','media','alta') DEFAULT 'media',
    estado ENUM('pendiente','completada') DEFAULT 'pendiente',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP NULL,
    asignatura_id INT,
    usuario_id INT NOT NULL,
    tipo ENUM('tarea','evaluacion','evento') NOT NULL,
    profesor VARCHAR(100),
    FOREIGN KEY (asignatura_id) REFERENCES asignatura(id),
    FOREIGN KEY (usuario_id) REFERENCES usuario(id)
);

CREATE TABLE notificacion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo ENUM('recordatorio','aviso','otro') NOT NULL,
    mensaje TEXT,
    fecha_programada DATETIME,
    fecha_enviada DATETIME,
    leida TINYINT(1) DEFAULT 0,
    evento_id INT,
    FOREIGN KEY (evento_id) REFERENCES evento(id)
);

CREATE TABLE configuracion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tema ENUM('claro','oscuro') DEFAULT 'claro',
    idioma ENUM('es','en') DEFAULT 'es',
    notificaciones_activas TINYINT(1) DEFAULT 1,
    horario_silencioso_inicio TIME,
    horario_silencioso_fin TIME,
    id_usuario INT UNIQUE,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id)
);  