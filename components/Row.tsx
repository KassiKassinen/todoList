import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Task } from '../types/task'

interface TodoRowProps {
    item: Task,
    toggleTodo: (id: number) => void
}


export default function Row({ item, toggleTodo }: TodoRowProps) {
    return (
        <View style={styles.todoRow}>
            <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => toggleTodo(item.id)}
                accessibilityRole="button"
                accessibilityLabel={item.completed
                    ? `Mark ${item.text} as incomplete`
                    : `Mark ${item.text} as completed`}
            >
                <Text style={[
                    styles.todoText,
                    item.completed && styles.completedText
                ]}>
                    {item.text}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    todoRow: {
        flexDirection: 'row',
        backgroundColor: '#f5f5f5',
        padding: 4,
        margin: 4,
        borderColor: '#c1c0c0',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 8,
        alignItems: 'center'

    },
    todoText: {
        flex: 1,
        color: '#000',
    },
    deleteButton: {
        backgroundColor: '#FF3B30',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 6,
    },
    deleteButtonText: {
        color: 'white',
        fontWeight: '600',
    },
    completedText: {
        textDecorationLine: 'line-through',
        color: '#999',
    }

})