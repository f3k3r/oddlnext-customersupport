cmake_minimum_required(VERSION 3.22.1)
project("native-lib.cpp")

# Add the shared library
add_library(${CMAKE_PROJECT_NAME} SHARED native-lib.cpp)

# Link the libraries
target_link_libraries(${CMAKE_PROJECT_NAME}
        android
        log)
