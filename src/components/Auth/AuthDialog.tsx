"use client";

import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/animate-ui/components/radix/dialog';
import { Drawer } from 'vaul';
import { Button } from '@/components/Button/Button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signIn, signUp } from '@/lib/auth-client';
import { RefreshCw } from 'lucide-react';

interface AuthDialogProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
}

export function AuthDialog({ isOpen, onClose, initialMode = 'login' }: AuthDialogProps) {
  const isMobile = useMediaQuery({ query: '(max-width: 639px)' });
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captcha, setCaptcha] = useState({ a: 0, b: 0, answer: 0 });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      generateCaptcha();
      setMode(initialMode);
      setError(null);
    }
  }, [isOpen, initialMode]);

  const generateCaptcha = () => {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    setCaptcha({ a, b, answer: a + b });
    setCaptchaInput('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (parseInt(captchaInput) !== captcha.answer) {
      setError('Неверный ответ');
      generateCaptcha();
      return;
    }

    setLoading(true);
    try {
      if (mode === 'login') {
        const { error } = await signIn.email({
          email,
          password,
        });
        if (error) throw error;
      } else {
        const { error } = await signUp.email({
          email,
          password,
          name,
        });
        if (error) throw error;
      }
      onClose();
    } catch (err: any) {
      setError(err.message || 'Ошибка');
      generateCaptcha();
    } finally {
      setLoading(false);
    }
  };

  const renderForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4 py-2">
      {mode === 'register' && (
        <div className="space-y-1.5">
          <Label htmlFor="name" className="text-xs opacity-50">Имя</Label>
          <Input
            id="name"
            placeholder="Имя"
            className="bg-white/5 border-white/10 rounded-xl h-10"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
      )}
      <div className="space-y-1.5">
        <Label htmlFor="email" className="text-xs opacity-50">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="email@example.com"
          className="bg-white/5 border-white/10 rounded-xl h-10"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="password" className="text-xs opacity-50">Пароль</Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          className="bg-white/5 border-white/10 rounded-xl h-10"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs opacity-50">Решите: {captcha.a} + {captcha.b} = ?</Label>
        <div className="flex gap-2">
          <Input
            id="captcha"
            placeholder="Ответ"
            className="bg-white/5 border-white/10 rounded-xl h-10 flex-1"
            value={captchaInput}
            onChange={(e) => setCaptchaInput(e.target.value)}
            required
          />
          <Button type="button" view="ghost" onClick={generateCaptcha} size="icon" className="h-10 w-10 shrink-0 border border-white/10 rounded-xl">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {error && <p className="text-red-500 text-xs">{error}</p>}

      <Button type="submit" className="w-full h-11 rounded-xl mt-4" disabled={loading}>
        {loading ? 'Загрузка...' : mode === 'login' ? 'Войти' : 'Регистрация'}
      </Button>

      <div className="text-center mt-4">
        <button
          type="button"
          onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
          className="text-xs opacity-50 hover:opacity-100 transition-opacity underline underline-offset-4"
        >
          {mode === 'login' ? 'Нет аккаунта? Зарегистрироваться' : 'Уже есть аккаунт? Войти'}
        </button>
      </div>
    </form>
  );

  if (isMobile) {
    return (
      <Drawer.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/60 z-[100] backdrop-blur-sm" />
          <Drawer.Content className="fixed bottom-0 left-0 right-0 z-[101] bg-[#0c0312] border-t border-white/10 rounded-t-[24px] p-6 outline-none">
            <div className="mx-auto w-10 h-1 rounded-full bg-white/20 mb-6" />
            <Drawer.Title className="text-xl font-oddval mb-1">
              {mode === 'login' ? 'Вход' : 'Регистрация'}
            </Drawer.Title>
            <Drawer.Description className="text-xs opacity-50 mb-4">
              {mode === 'login' ? 'С возвращением!' : 'Присоединяйтесь к нам'}
            </Drawer.Description>
            {renderForm()}
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-[#0c0312]/95 backdrop-blur-2xl border-white/10 rounded-[24px] sm:max-w-[400px] z-[100] p-8">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl font-oddval">
            {mode === 'login' ? 'Вход' : 'Регистрация'}
          </DialogTitle>
          <DialogDescription className="text-xs opacity-50">
            {mode === 'login' ? 'С возвращением!' : 'Присоединяйтесь к нам'}
          </DialogDescription>
        </DialogHeader>
        {renderForm()}
      </DialogContent>
    </Dialog>
  );
}
