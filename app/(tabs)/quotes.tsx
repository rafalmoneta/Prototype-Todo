import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { View, Text, useThemeColor } from "@/components/Themed";
import { Ionicons } from "@expo/vector-icons";
import useFetch from "@/hooks/useFetch";
import { Quote } from "@/types/quote";

const QuotesPage = () => {
  const { data, error, isLoading, refetch } = useFetch<Quote>("random", {});
  const quote = data ? data[0] : null;

  const buttonBackground = useThemeColor({}, "buttonBackground");
  const iconColor = useThemeColor({}, "iconDefault");
  const backgroundColor = useThemeColor({}, "background");
  const borderColor = useThemeColor(
    { light: "#eee", dark: "rgba(255,255,255,0.1)" },
    "background"
  );

  if ((!quote && !isLoading) || error)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Sorry, something when wrong :(</Text>
      </View>
    );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{ flex: 1, backgroundColor }}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={styles.content}>
          {isLoading ? (
            <>
              <Text style={styles.quoteText}>Fetching a Quote...</Text>
              <Text style={styles.quoteAuthor}>Be patient</Text>
            </>
          ) : (
            <>
              <Text style={styles.quoteText}>{quote?.q}</Text>
              <Text style={styles.quoteAuthor}>{quote?.a}</Text>
            </>
          )}
        </View>
      </ScrollView>

      <View style={[styles.footer, { borderColor }]}>
        {/* TODO: to do favorites */}
        <TouchableOpacity
          disabled={true}
          style={[
            styles.actionButton,
            { borderColor: buttonBackground, borderWidth: 1 },
          ]}
          onPress={() => {}}
        >
          <Ionicons
            name="star-outline"
            size={20}
            color={iconColor}
            // color={true ? "#FFE900" : iconColor}
          />
        </TouchableOpacity>

        <TouchableOpacity
          disabled={isLoading}
          style={[
            styles.actionButton,
            { flex: 1, backgroundColor: buttonBackground },
          ]}
          onPress={() => refetch()}
        >
          <Text style={{ textAlign: "center" }}>
            Take a new quote from the API!
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderTopWidth: 1,
  },
  actionButton: {
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    borderRadius: 8,
  },
  quoteContainer: {},
  quoteText: {
    textAlign: "center",
    fontSize: 26,
    fontWeight: "600",
  },
  quoteAuthor: {
    marginVertical: 16,
  },
});

export default QuotesPage;
