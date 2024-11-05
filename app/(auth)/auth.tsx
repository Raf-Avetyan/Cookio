"use client";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { ISigninForm, ISignupForm } from "@/types/auth.types";
import { authService } from "@/services/auth.service";
import { Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { toast, Toaster } from "sonner-native";
import { useAuthMiddleware } from "@/hooks/useAuthMidleware";
import { StatusBar } from "expo-status-bar";
import LottieView from "lottie-react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Auth() {
  useAuthMiddleware();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ISigninForm | ISignupForm>({
    mode: "onChange",
  });

  const router = useRouter();

  const [isLoginForm, setIsLoginForm] = useState(true);

  const { mutate, isPending } = useMutation({
    mutationKey: ["auth"],
    mutationFn: (data: ISigninForm | ISignupForm) =>
      authService.main(isLoginForm ? "signin" : "signup", data),
    onSuccess: () => {
      reset();
      router.replace("/(root)/(tabs)/");
      toast.success(`Successfully ${isLoginForm ? "logined" : "registered"}!`);
    },
    onError: () => {
      toast.error(`${isLoginForm ? "Login" : "Register"} failed! Try again`);
      reset();
    },
  });

  const onSubmit = (data: ISigninForm | ISignupForm) => {
    mutate(data);
  };

  return (
    <GestureHandlerRootView>
      <SafeAreaView style={{ backgroundColor: "#1E1E1E", flex: 1 }}>
        <View style={styles.container}>
          <Text style={styles.title}>{isLoginForm ? "Signin" : "Signup"}</Text>
          {!isPending ? (
            <View>
              {!isLoginForm && (
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      placeholder="Username*"
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                      autoComplete="off"
                      style={styles.input}
                      placeholderTextColor="rgba(255,255,255, .2)"
                    />
                  )}
                  name="username"
                />
              )}
              <View>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      placeholder="Email"
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                      autoComplete="off"
                      style={styles.input}
                      placeholderTextColor="rgba(255,255,255, .2)"
                    />
                  )}
                  name="email"
                  rules={{
                    required: "You must enter your email",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Enter a valid email address",
                    },
                  }}
                />
                {errors.email && (
                  <Text style={styles.inputError}>{errors.email.message}</Text>
                )}
              </View>
              <View>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      placeholder="Password"
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                      autoComplete="off"
                      secureTextEntry
                      style={styles.input}
                      placeholderTextColor="rgba(255,255,255, .2)"
                    />
                  )}
                  name="password"
                  rules={{
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long!",
                    },
                    required: {
                      value: true,
                      message: "Password is required!",
                    },
                  }}
                />
                {errors.password && (
                  <Text style={styles.inputError}>
                    Password must be at least 6 characters long!
                  </Text>
                )}
              </View>
              {isLoginForm ? (
                <View>
                  <Pressable
                    disabled={isPending}
                    onPress={handleSubmit(onSubmit)}
                  >
                    <Text style={styles.submitBtn}>Signin</Text>
                  </Pressable>
                  <View
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "row",
                      justifyContent: "center",
                      marginTop: 12,
                    }}
                  >
                    <Text
                      style={{
                        color: "whitesmoke",
                        marginRight: 5,
                        fontFamily: "PoppinsRegular",
                      }}
                    >
                      Don&apos;t have an account?
                    </Text>
                    <Pressable onPress={() => setIsLoginForm(false)}>
                      <Text
                        style={{
                          color: "yellowgreen",
                          fontFamily: "PoppinsRegular",
                        }}
                      >
                        Signup
                      </Text>
                    </Pressable>
                  </View>
                </View>
              ) : (
                <View>
                  <Pressable
                    disabled={isPending}
                    onPress={handleSubmit(onSubmit)}
                  >
                    <Text style={styles.submitBtn}>Signup</Text>
                  </Pressable>
                  <View
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "row",
                      justifyContent: "center",
                      marginTop: 12,
                    }}
                  >
                    <Text
                      style={{
                        color: "whitesmoke",
                        marginRight: 5,
                        fontFamily: "PoppinsRegular",
                      }}
                    >
                      Already have an account?
                    </Text>
                    <Pressable onPress={() => setIsLoginForm(true)}>
                      <Text
                        style={{
                          color: "dodgeblue",
                          fontFamily: "PoppinsRegular",
                        }}
                      >
                        Signin
                      </Text>
                    </Pressable>
                  </View>
                </View>
              )}
            </View>
          ) : (
            <View style={styles.loadingContainer}>
              <LottieView
                source={require("../../assets/lottie/loader2.json")}
                autoPlay
                loop
                style={styles.lottie}
              />
            </View>
          )}
        </View>
        <StatusBar style="light" />
        <Toaster />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#1E1E1E",
  },
  title: {
    fontSize: 42,
    textAlign: "center",
    color: "whitesmoke",
    fontFamily: "PoppinsBold",
    marginTop: 30,
    flexBasis: "28%",
  },
  input: {
    borderColor: "rgba(255,255,255, .2)",
    borderWidth: 2,
    borderRadius: 6,
    marginTop: 10,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 12,
    paddingBottom: 10,
    width: 340,
    color: "whitesmoke",
    fontFamily: "PoppinsRegular",
    fontSize: 14,
  },
  inputError: {
    color: "orangered",
    fontSize: 12,
    fontFamily: "PoppinsRegular",
    marginTop: 4,
  },
  submitBtn: {
    backgroundColor: "#386BF6",
    color: "whitesmoke",
    paddingTop: 10,
    paddingBottom: 6,
    textAlign: "center",
    borderRadius: 8,
    fontSize: 16,
    marginTop: 24,
    fontFamily: "PoppinsBold",
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1E1E1E",
    zIndex: 999,
  },
  lottie: {
    width: 110,
    height: 110,
  },
});
