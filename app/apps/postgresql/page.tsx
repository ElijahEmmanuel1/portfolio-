'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Server, Copy, Check, Terminal, BookOpen, Zap, Sparkles } from 'lucide-react';
import { useState } from 'react';

export default function PostgreSQLPage() {
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCommand(text);
    setTimeout(() => setCopiedCommand(null), 2000);
  };

  const commands = [
    {
      title: 'Se connecter à PostgreSQL',
      command: 'psql -U postgres -d mydb',
      description: 'Connecte au serveur PostgreSQL avec l\'utilisateur postgres',
    },
    {
      title: 'Créer une base de données',
      command: 'CREATE DATABASE myapp;',
      description: 'Crée une nouvelle base de données',
    },
    {
      title: 'Créer une table',
      command: 'CREATE TABLE users (id SERIAL PRIMARY KEY, name VARCHAR(100), email VARCHAR(100));',
      description: 'Crée une table users avec des colonnes',
    },
    {
      title: 'Insérer des données',
      command: 'INSERT INTO users (name, email) VALUES (\'John\', \'john@example.com\');',
      description: 'Insère un nouvel utilisateur',
    },
    {
      title: 'Requête SELECT',
      command: 'SELECT * FROM users WHERE name LIKE \'%John%\';',
      description: 'Sélectionne les utilisateurs dont le nom contient John',
    },
  ];

  const features = [
    'Conformité ACID complète',
    'Support JSON natif',
    'Réplication avancée',
    'Partitionnement de tables',
    'Index performants',
    'Extensions riches (PostGIS, etc.)',
  ];

  return (
    <div className="min-h-screen liquid-glass-bg">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 backdrop-blur-2xl bg-black/20 border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all font-bold group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Dashboard
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Server className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-black text-lg">PostgreSQL</span>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-700 p-12 shadow-2xl mb-8"
        >
          <motion.div
            className="absolute -top-20 -right-20 w-64 h-64 bg-purple-400/30 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <div className="relative flex items-start gap-8">
            <div className="relative">
              <div className="absolute inset-0 bg-white/20 rounded-3xl blur-xl" />
              <div className="relative w-32 h-32 rounded-3xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                <Server className="w-16 h-16 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <h1 className="text-6xl font-black text-white">PostgreSQL</h1>
                <Sparkles className="w-8 h-8 text-purple-300" />
              </div>
              <p className="text-2xl text-purple-50 leading-relaxed font-medium">
                Système de gestion de base de données relationnelle avancé et open-source, 
                reconnu pour sa fiabilité, sa robustesse et ses fonctionnalités avancées.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Commands & Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Commands Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Terminal className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-black text-white">Commandes SQL</h2>
            </div>

            <div className="space-y-4">
              {commands.map((cmd, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ x: 5 }}
                  className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 hover:bg-white/10 hover:border-purple-500/50 transition-all"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        {cmd.title}
                        <Sparkles className="w-4 h-4 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h3>
                      <button
                        onClick={() => copyToClipboard(cmd.command)}
                        className="px-3 py-2 rounded-lg bg-purple-600/20 hover:bg-purple-600/40 backdrop-blur-sm transition-all border border-purple-500/30 flex items-center gap-2 text-sm font-semibold text-purple-300"
                      >
                        {copiedCommand === cmd.command ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>Copié!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            <span>Copier</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div className="bg-black/40 backdrop-blur-sm rounded-xl p-4 font-mono text-sm overflow-x-auto border border-white/5 mb-3">
                      <code className="text-purple-400">{cmd.command}</code>
                    </div>
                    <p className="text-gray-400">{cmd.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Features */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-black text-white">Fonctionnalités</h3>
              </div>
              <ul className="space-y-3">
                {features.map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-start gap-3 text-gray-300"
                  >
                    <div className="w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="font-semibold">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-black text-white">Ressources</h3>
              </div>
              <div className="space-y-3">
                <a
                  href="https://www.postgresql.org/docs/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-3 bg-indigo-500/20 border border-indigo-500/30 rounded-xl hover:bg-indigo-500/30 transition-all"
                >
                  <p className="font-bold text-indigo-300">Documentation officielle</p>
                  <p className="text-sm text-indigo-400">postgresql.org/docs</p>
                </a>
                <a
                  href="https://www.postgresqltutorial.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-3 bg-purple-500/20 border border-purple-500/30 rounded-xl hover:bg-purple-500/30 transition-all"
                >
                  <p className="font-bold text-purple-300">PostgreSQL Tutorial</p>
                  <p className="text-sm text-purple-400">Guides pratiques</p>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
