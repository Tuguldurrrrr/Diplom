package com.dronehub.controller;

import com.dronehub.security.PasswordUtil;

public class AuthController {
    public String register(String fullName, String email, String rawPassword, String roleCode) {
        String hash = PasswordUtil.hash(rawPassword);
        // TODO: userDao.insert(...)
        return "REGISTER_SUCCESS:" + email + ":" + roleCode + ":" + hash;
    }

    public String login(String email, String rawPassword) {
        // TODO: userDao.findByEmail(email)
        String storedHash = PasswordUtil.hash("demo1234");
        if (PasswordUtil.matches(rawPassword, storedHash)) {
            return "LOGIN_SUCCESS";
        }
        return "LOGIN_FAILED";
    }
}
