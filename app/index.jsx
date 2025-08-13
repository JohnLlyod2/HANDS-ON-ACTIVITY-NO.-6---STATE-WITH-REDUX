import { configureStore, createSlice, nanoid } from "@reduxjs/toolkit";
import { useMemo, useState } from "react";
import {
  FlatList,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import {
  Appbar,
  Avatar,
  Banner,
  Button,
  Card,
  Divider,
  MD3DarkTheme,
  MD3LightTheme,
  Provider as PaperProvider,
  Switch,
  Text,
  TextInput,
} from "react-native-paper";
import {
  Provider as ReduxProvider,
  useDispatch,
  useSelector,
} from "react-redux";

// UI slice with added taskAddedBanner flag
const uiSlice = createSlice({
  name: "ui",
  initialState: { darkMode: false, showBanner: true, taskAddedBanner: false },
  reducers: {
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
    },
    dismissBanner(state) {
      state.showBanner = false;
    },
    showTaskAddedBanner(state) {
      state.taskAddedBanner = true;
    },
    dismissTaskAddedBanner(state) {
      state.taskAddedBanner = false;
    },
  },
});

// Todos slice
const todosSlice = createSlice({
  name: "todos",
  initialState: { items: [] },
  reducers: {
    addTodo: {
      reducer(state, action) {
        state.items.unshift(action.payload);
      },
      prepare(title) {
        return {
          payload: {
            id: nanoid(),
            title,
            done: false,
            createdAt: Date.now(),
          },
        };
      },
    },
    toggleTodo(state, action) {
      const t = state.items.find((x) => x.id === action.payload);
      if (t) t.done = !t.done;
    },
    removeTodo(state, action) {
      state.items = state.items.filter((x) => x.id !== action.payload);
    },
    clearUndoneTodos(state) {
      // Clear only todos where done === false
      state.items = state.items.filter((x) => x.done);
    },
  },
});

const {
  toggleDarkMode,
  dismissBanner,
  showTaskAddedBanner,
  dismissTaskAddedBanner,
} = uiSlice.actions;
const { addTodo, toggleTodo, removeTodo, clearUndoneTodos } = todosSlice.actions;

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    todos: todosSlice.reducer,
  },
});

export default function App() {
  return (
    <ReduxProvider store={store}>
      <ThemedApp />
    </ReduxProvider>
  );
}

function ThemedApp() {
  const darkMode = useSelector((s) => s.ui.darkMode);
  const theme = useMemo(
    () => (darkMode ? MD3DarkTheme : MD3LightTheme),
    [darkMode]
  );
  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={{ flex: 1 }}>
        <AppScaffold />
      </SafeAreaView>
    </PaperProvider>
  );
}

function AppScaffold() {
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const showBanner = useSelector((s) => s.ui.showBanner);
  const taskAddedBanner = useSelector((s) => s.ui.taskAddedBanner);

  return (
    <View style={[styles.container, isTablet && styles.containerTablet]}>
      <Appbar.Header>
        <Appbar.Content title="Redux Todos" />
        <DarkModeSwitch />
      </Appbar.Header>

{/* 
      {showBanner && (
        <Banner
          visible
          actions={[{ label: "Got it", onPress: () => dispatch(dismissBanner()) }]}
          icon={({ size }) => <Avatar.Icon size={size} icon="information-outline" />}
        >
          Welcome to To Do List, you can add tasks here.
        </Banner>
      )} */}

      {taskAddedBanner && (
        <Banner
          visible
          actions={[{ label: "Okay", onPress: () => dispatch(dismissTaskAddedBanner()) }]}
          icon={({ size }) => <Avatar.Icon size={size} icon="check" />}
        >
          Task Added Successfully
        </Banner>
      )}

      <ScrollView
        style={styles.content}
        contentContainerStyle={[isTablet && styles.contentTablet, { paddingBottom: 24 }]}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[styles.column, isTablet && styles.columnTablet]}>
          <TodosCard />
        </View>
      </ScrollView>

      <Appbar style={styles.footer}>
        <Appbar.Content
          title="Footer"
          subtitle={Platform.select({
            ios: "iOS",
            android: "Android",
            default: "Web",
          })}
        />
      </Appbar>
    </View>
  );
}

function DarkModeSwitch() {
  const dispatch = useDispatch();
  const darkMode = useSelector((s) => s.ui.darkMode);
  return (
    <View style={{ flexDirection: "row", alignItems: "center", paddingRight: 12 }}>
      <Text accessibilityRole="header" style={{ marginRight: 8 }}>
        {darkMode ? "Dark" : "Light"}
      </Text>
      <Switch
        value={darkMode}
        onValueChange={() => dispatch(toggleDarkMode())}
        accessibilityLabel="Toggle dark mode"
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      />
    </View>
  );
}

function TodosCard() {
  const dispatch = useDispatch();
  const items = useSelector((s) => s.todos.items);
  const [title, setTitle] = useState("");
  const { width } = useWindowDimensions();
  const numColumns = width >= 900 ? 2 : 1;

  const addTask = () => {
    if (!title.trim()) return;
    dispatch(addTodo(title.trim()));
    setTitle("");
    dispatch(showTaskAddedBanner());
  };

  // Separate undone and done tasks
  const undoneTasks = items.filter((t) => !t.done);
  const doneTasks = items.filter((t) => t.done);

  return (
    <Card style={styles.card}>
      <Card.Title
        title="To do List"
        subtitle="Add Task down here ⤵"
        left={(props) => <Avatar.Icon {...props} icon="check-circle-outline" />}
      />
      <Card.Content>
        <View style={{ flexDirection: "row", gap: 8 }}>
          <TextInput
            style={{ flex: 1 }}
            label="Input Task here"
            value={title}
            onChangeText={setTitle}
            onSubmitEditing={addTask}
            returnKeyType="done"
          />
          <Button mode="contained" onPress={addTask}>
            Add
          </Button>
        </View>
        <Divider style={{ marginVertical: 12 }} />

        {/* Undone Tasks Section */}
        <Text style={{ fontWeight: "bold", marginBottom: 6 }}>Pending Tasks</Text>
        {undoneTasks.length === 0 && (
          <Text accessibilityLabel="Empty undone list">No pending tasks</Text>
        )}
        <FlatList
          data={undoneTasks}
          key={numColumns}
          numColumns={numColumns}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ gap: 8 }}
          renderItem={({ item }) => (
            <Card style={{ flex: 1, marginRight: numColumns > 1 ? 8 : 0 }}>
              <Card.Title
                title={item.title}
                subtitle={new Date(item.createdAt).toLocaleString()}
                left={(props) => (
                  <Avatar.Icon {...props} icon={item.done ? "check" : "circle-outline"} />
                )}
              />
              <Card.Actions>
                <Button onPress={() => dispatch(toggleTodo(item.id))}>
                  {item.done ? "Undo" : "Done"}
                </Button>
                <Button onPress={() => dispatch(removeTodo(item.id))} textColor="rgba(255, 255, 255, 1)" style={{ backgroundColor: 'rgba(255, 88, 88, 0.8)' }}>
                  Remove
                </Button>
              </Card.Actions>
            </Card>
          )}
        />

        {/* Done Tasks Section */}
        <Divider style={{ marginVertical: 12 }} />
        <Text style={{ fontWeight: "bold", marginBottom: 6 }}>Completed Tasks</Text>
        {doneTasks.length === 0 && (
          <Text accessibilityLabel="Empty done list">No completed tasks</Text>
        )}
        <FlatList
          data={doneTasks}
          key={numColumns + 1} // to force rerender separately
          numColumns={numColumns}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ gap: 8 }}
          renderItem={({ item }) => (
            <Card style={{ flex: 1, marginRight: numColumns > 1 ? 8 : 0}}>
              <Card.Title
                title={item.title}
                subtitle={new Date(item.createdAt).toLocaleString()}
                left={(props) => (
                  <Avatar.Icon {...props} icon={item.done ? "check" : "circle-outline"} />
                )}
              />
              <Card.Actions>
                <Button onPress={() => dispatch(toggleTodo(item.id))}>
                  Undo
                </Button>
                <Button onPress={() => dispatch(removeTodo(item.id))} textColor="rgba(255, 255, 255, 1)" style={{ backgroundColor: 'rgba(255, 88, 88, 0.8)' }}>
                  Remove
                </Button>
              </Card.Actions>
            </Card>
          )}
        />

        {/* Clear only undone tasks */}
        {undoneTasks.length > 0 && (
          <Button
            style={{ marginTop: 8 }}
            onPress={() => dispatch(clearUndoneTodos())}
          >
            Clear All Pending Tasks
          </Button>
        )}
      </Card.Content>
    </Card>
  );
}

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "transparent" },
  containerTablet: { paddingHorizontal: 12 },
  content: { flex: 1, padding: 12 },
  contentTablet: { flexDirection: "row", gap: 12 },
  column: { flex: 1 },
  columnTablet: { flex: 1 },
  card: { marginBottom: 12, borderRadius: 16, overflow: "hidden" },
  footer: { justifyContent: "center" },
});

