import React, { useState, useMemo } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
} from "react-native";

type Personaje = {
  nombre: string;
  claseNivel: string;
  trasfondo: string;
  jugador: string;
  raza: string;
  alineamiento: string;
  experiencia: string;
  fuerza: string;
  destreza: string;
  constitucion: string;
  inteligencia: string;
  sabiduria: string;
  carisma: string;
};
export default function CreacionPersonaje() {
  // Estado inicial del personaje
  const [personaje, setPersonaje] = useState<Personaje>({
    nombre: "",
    claseNivel: "",
    trasfondo: "",
    jugador: "",
    raza: "",
    alineamiento: "",
    experiencia: "",
    fuerza: "8",
    destreza: "8",
    constitucion: "8",
    inteligencia: "8",
    sabiduria: "8",
    carisma: "8",
  });

  const pointBuyCosts: { [key: number]: number } = {
    8: 0,
    9: 1,
    10: 2,
    11: 3,
    12: 4,
    13: 5,
    14: 7,
    15: 9,
  };

  const getModificador = (valor: string) => {
    const num = parseInt(valor);
    if (isNaN(num)) return "";
    const mod = Math.floor((num - 10) / 2);
    return mod >= 0 ? `+${mod}` : `${mod}`;
  };

  const getModifierColor = (valor: string) => {
    const num = parseInt(valor);
    if (isNaN(num)) return "#444";
    const mod = Math.floor((num - 10) / 2);
    return mod < 0 ? "#cc0000" : "#228B22"; // rojo para negativo, verde para positivo o cero
  };

  const puntosGastados = useMemo(() => {
    let total = 0;
    for (const stat of [
      "fuerza",
      "destreza",
      "constitucion",
      "inteligencia",
      "sabiduria",
      "carisma",
    ]) {
      const val = parseInt(personaje[stat]);
      if (!isNaN(val)) {
        total += pointBuyCosts[val] ?? 0;
      }
    }
    return total;
  }, [personaje]);

  const puntosRestantes = 27 - puntosGastados;
  const esValido = puntosRestantes >= 0;

  const handleChange = (campo: string, valor: string) => {
    // Si el campo es una característica (stats), validamos numéricamente
    const esStat = [
      "fuerza",
      "destreza",
      "constitucion",
      "inteligencia",
      "sabiduria",
      "carisma",
    ].includes(campo);

    if (esStat) {
      const valNum = parseInt(valor);
      if (!isNaN(valNum) && valNum >= 8 && valNum <= 15) {
        setPersonaje({ ...personaje, [campo]: valor });
      } else if (valor === "") {
        setPersonaje({ ...personaje, [campo]: "" });
      }
    } else {
      // Si no es stat, simplemente lo seteamos como texto
      setPersonaje({ ...personaje, [campo]: valor });
    }
  };

  const aumentarEstadistica = (campo: string) => {
    const valorActual = parseInt(personaje[campo]);
    if (valorActual < 15) {
      setPersonaje({
        ...personaje,
        [campo]: (valorActual + 1).toString(),
      });
    }
  };

  const disminuirEstadistica = (campo: string) => {
    const valorActual = parseInt(personaje[campo]);
    if (valorActual > 8) {
      setPersonaje({
        ...personaje,
        [campo]: (valorActual - 1).toString(),
      });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>📜 Creación de personaje</Text>

      <View style={styles.field}>
        <Text style={styles.label}>Nombre del personaje</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: Tharion"
          value={personaje.nombre}
          onChangeText={(text) => handleChange("nombre", text)}
        />
      </View>

      <View style={styles.row}>
        <View style={styles.halfField}>
          <Text style={styles.label}>Clase y Nivel</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: Guerrero 3"
            value={personaje.claseNivel}
            onChangeText={(text) => handleChange("claseNivel", text)}
          />
        </View>

        <View style={styles.halfField}>
          <Text style={styles.label}>Trasfondo</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: Noble"
            value={personaje.trasfondo}
            onChangeText={(text) => handleChange("trasfondo", text)}
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.halfField}>
          <Text style={styles.label}>Nombre del jugador</Text>
          <TextInput
            style={styles.input}
            placeholder="Tu nombre"
            value={personaje.jugador}
            onChangeText={(text) => handleChange("jugador", text)}
          />
        </View>

        <View style={styles.halfField}>
          <Text style={styles.label}>Raza</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: Elfo"
            value={personaje.raza}
            onChangeText={(text) => handleChange("raza", text)}
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.halfField}>
          <Text style={styles.label}>Alineamiento</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: Legal bueno"
            value={personaje.alineamiento}
            onChangeText={(text) => handleChange("alineamiento", text)}
          />
        </View>

        <View style={styles.halfField}>
          <Text style={styles.label}>XP</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: 1200"
            keyboardType="numeric"
            value={personaje.experiencia}
            onChangeText={(text) => handleChange("experiencia", text)}
          />
        </View>
      </View>

      {/* Campos para las características en dos columnas */}
      <Text style={[styles.title, { marginTop: 30 }]}>🎯 Características</Text>

      <View style={styles.characteristicsRow}>
        {["fuerza", "destreza", "constitucion"].map((stat) => (
          <View key={stat} style={styles.characteristicBlock}>
            <Text style={styles.label}>
              {stat.charAt(0).toUpperCase() + stat.slice(1)}
            </Text>
            <View style={styles.circleWrapper}>
              <TextInput
                style={styles.circleInput}
                keyboardType="numeric"
                maxLength={2}
                value={personaje[stat]}
                onChangeText={(text) => handleChange(stat, text)}
              />
            </View>
            <Text
              style={[
                styles.modifierText,
                { color: getModifierColor(personaje[stat]) },
              ]}
            >
              {getModificador(personaje[stat])}
            </Text>

            {/* Botones de - y + */}
            <View style={styles.adjustmentButtons}>
              <TouchableOpacity
                onPress={() => disminuirEstadistica(stat)}
                style={styles.adjustButton}
              >
                <Text style={styles.adjustButtonText}>-</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => aumentarEstadistica(stat)}
                style={styles.adjustButton}
              >
                <Text style={styles.adjustButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.characteristicsRow}>
        {["inteligencia", "sabiduria", "carisma"].map((stat) => (
          <View key={stat} style={styles.characteristicBlock}>
            <Text style={styles.label}>
              {stat.charAt(0).toUpperCase() + stat.slice(1)}
            </Text>
            <View style={styles.circleWrapper}>
              <TextInput
                style={styles.circleInput}
                keyboardType="numeric"
                maxLength={2}
                value={personaje[stat]}
                onChangeText={(text) => handleChange(stat, text)}
              />
            </View>
            <Text
              style={[
                styles.modifierText,
                { color: getModifierColor(personaje[stat]) },
              ]}
            >
              {getModificador(personaje[stat])}
            </Text>

            {/* Botones de - y + */}
            <View style={styles.adjustmentButtons}>
              <TouchableOpacity
                onPress={() => disminuirEstadistica(stat)}
                style={styles.adjustButton}
              >
                <Text style={styles.adjustButtonText}>-</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => aumentarEstadistica(stat)}
                style={styles.adjustButton}
              >
                <Text style={styles.adjustButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      {/* Mostrar puntos restantes */}
      <Text
        style={[
          styles.pointsLabel,
          { color: esValido ? "#228B22" : "#cc0000" },
        ]}
      >
        {esValido
          ? `Puntos restantes: ${puntosRestantes}`
          : `¡Te pasaste por ${Math.abs(puntosRestantes)} puntos!`}
      </Text>

      <TouchableOpacity
        style={[
          styles.saveButton,
          { backgroundColor: esValido ? "#007bff" : "#999" },
        ]}
        disabled={!esValido}
        onPress={() => console.log("Guardando personaje...", personaje)}
      >
        <Text style={styles.saveButtonText}>Guardar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 100,
    paddingTop: 50,
    backgroundColor: "#f9f9f9",
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  label: {
    marginBottom: 6,
    fontWeight: "600",
    color: "#444",
    textTransform: "capitalize",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 16,
  },
  halfField: {
    flex: 1,
  },
  characteristicsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 24,
  },
  characteristicBlock: {
    alignItems: "center",
    flex: 1,
  },
  circleWrapper: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#888",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    marginBottom: 4,
  },
  circleInput: {
    fontSize: 18,
    textAlign: "center",
    width: "100%",
  },
  modifierText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  adjustmentButtons: {
    flexDirection: "row",
    marginTop: 10,
  },
  adjustButton: {
    backgroundColor: "#007bff",
    borderRadius: 8,
    marginHorizontal: 4,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  adjustButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  saveButton: {
    marginTop: 30,
    backgroundColor: "#007bff",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  pointsLabel: {
    fontSize: 18,
    textAlign: "center",
    marginVertical: 20,
  },
});
