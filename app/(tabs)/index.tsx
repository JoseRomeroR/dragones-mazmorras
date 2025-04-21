import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  // Placeholder para lista futura
  const characters: string | ArrayLike<any> | null | undefined = [];

  return (
    <View style={styles.container}>
      {/* Título centrado */}
      <Text style={styles.title}>Personajes DyD</Text>

      {/* Lista de personajes (por ahora vacía) */}
      <View style={styles.listContainer}>
        {characters.length === 0 ? (
          <Text style={styles.placeholderText}>No hay personajes aún.</Text>
        ) : (
          <FlatList
            data={characters}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.characterItem}>
                <Text>{item.name}</Text>
              </View>
            )}
          />
        )}
      </View>

      {/* Botón flotante */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/creacionPersonaje")}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  listContainer: {
    flex: 1,
  },
  placeholderText: {
    textAlign: "center",
    color: "#888",
    marginTop: 40,
    fontSize: 16,
  },
  characterItem: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
  },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "#007bff",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  fabText: {
    fontSize: 30,
    color: "#fff",
    fontWeight: "bold",
    marginTop: Platform.OS === "android" ? -2 : 0,
  },
});
