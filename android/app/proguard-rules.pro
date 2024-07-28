# Add project specific ProGuard rules here.
# You can control the set of applied configuration files using the
# proguardFiles setting in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# If your project uses WebView with JS, uncomment the following
# and specify the fully qualified class name to the JavaScript interface
# class:
#-keepclassmembers class fqcn.of.javascript.interface.for.webview {
#   public *;
#}

# Uncomment this to preserve the line number information for
# debugging stack traces.
#-keepattributes SourceFile,LineNumberTable

# If you keep the line number information, uncomment this to
# hide the original source file name.
#-renamesourcefileattribute SourceFile
# For AndroidX libraries
-keep class androidx.** { *; }
-dontwarn androidx.**

# For Google Play Services
-keep class com.google.android.gms.** { *; }
-dontwarn com.google.android.gms.**

# For support libraries
-keep class android.support.** { *; }
-dontwarn android.support.**

# For JUnit
-keep class org.junit.** { *; }
-dontwarn org.junit.**

# For Espresso
-keep class androidx.test.espresso.** { *; }
-dontwarn androidx.test.espresso.**

# For Capacitor (if needed, check Capacitor documentation)
-keep class com.getcapacitor.** { *; }
-dontwarn com.getcapacitor.**

# If there are specific classes or methods that are being stripped that you need to keep, add more specific rules.
