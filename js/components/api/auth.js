// js/api/auth.js
import { supabase } from '../config.js';

export async function loginWithEmail(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });
    
    if (error) throw error;
    
    // Verify Admin Role immediately upon login
    const isAdmin = await verifyAdminRole(data.user.id);
    if (!isAdmin) {
        await logout();
        throw new Error("Unauthorized: Administrator access required.");
    }
    
    return data;
}

export async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) console.error("Logout error:", error);
    window.location.href = '/';
}

export async function getCurrentSession() {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) return null;
    return session;
}

export async function verifyAdminRole(userId) {
    try {
        const { data, error } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', userId)
            .single();
            
        if (error || !data) return false;
        return data.role === 'admin';
    } catch (e) {
        return false;
    }
}
