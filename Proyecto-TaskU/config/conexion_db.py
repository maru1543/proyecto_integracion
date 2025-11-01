# conexion_db.py
# Archivo de conexión a la base de datos MySQL (TaskU)
# Requiere: pip install mysql-connector-python

import mysql.connector
from mysql.connector import Error


class ConexionDB:
    """Clase para manejar la conexión a la base de datos TaskU"""

    def __init__(self):
        self.host = 'localhost'
        self.database = 'tasku'       # Base de datos actual
        self.user = 'root'
        self.password = ''            # XAMPP por defecto
        self.port = 3307              # Puerto que usa tu MySQL
        self.connection = None
        self.cursor = None

    def conectar(self):
        """Establece la conexión con la base de datos"""
        try:
            self.connection = mysql.connector.connect(
                host=self.host,
                database=self.database,
                user=self.user,
                password=self.password,
                port=self.port
            )

            if self.connection.is_connected():
                self.cursor = self.connection.cursor(dictionary=True)
                print(f"✅ Conexión exitosa a la base de datos '{self.database}'")
                return True

        except Error as e:
            print(f"❌ Error al conectar a MySQL: {e}")
            return False

    def desconectar(self):
        """Cierra la conexión con la base de datos"""
        if self.connection and self.connection.is_connected():
            if self.cursor:
                self.cursor.close()
            self.connection.close()
            print("🔌 Conexión cerrada")

    def ejecutar_consulta(self, query, params=None):
        """Ejecuta una consulta SELECT y retorna los resultados"""
        try:
            if params:
                self.cursor.execute(query, params)
            else:
                self.cursor.execute(query)
            return self.cursor.fetchall()
        except Error as e:
            print(f"⚠️ Error al ejecutar consulta: {e}")
            return None

    def ejecutar_accion(self, query, params=None):
        """Ejecuta INSERT, UPDATE o DELETE"""
        try:
            if params:
                self.cursor.execute(query, params)
            else:
                self.cursor.execute(query)
            self.connection.commit()
            return True
        except Error as e:
            print(f"⚠️ Error al ejecutar acción: {e}")
            self.connection.rollback()
            return False

    def obtener_ultimo_id(self):
        """Obtiene el ID del último registro insertado"""
        return self.cursor.lastrowid


# === Función de prueba ===
def probar_conexion():
    """Verifica la conexión y lista las tablas disponibles"""
    db = ConexionDB()

    if db.conectar():
        print("\n=== CONEXIÓN EXITOSA ===\n")
        resultado = db.ejecutar_consulta("SHOW TABLES")
        print("Tablas en la base de datos:")
        for tabla in resultado:
            for nombre in tabla.values():
                print(f" - {nombre}")
        db.desconectar()
    else:
        print("No se pudo establecer la conexión")


# Si ejecutas este archivo directamente, prueba la conexión
if __name__ == "__main__":
    probar_conexion()
